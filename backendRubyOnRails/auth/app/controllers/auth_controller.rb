class AuthController < ApplicationController
    def login
        @user = User.by_username_or_email(params[:username]).first
        return render json: { error: "No se ha encontrado el usuario " }, status: :not_found if @user == nil
        return render json: { error: "Contraseña incorrecta" }, status: :unauthorized if !@user&.authenticate(params[:password])
        create_refresh
    end

    def register
        @user = User.where(email: params[:email] , isActive: false).first
        if @user != nil     
            @user.update!(user_params)
        else
            @user = User.new(user_params)
        end
        if @user.save
            confirm_token = TokenService.generate_confirm_token(@user)
            UserMailer.confirm_email(@user,confirm_token).deliver_later
            render json:{},status:200
        else
            pp "EERRRO"
            pp @user.errors
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def confirm 
        confirm_token = params[:confirm_token]
        return render json: { error:"token not found"}, status:400 unless confirm_token
        decoded = JWT.decode(confirm_token, ENV.fetch("JWT_SECRET_CONFIRM")).first
        @user = User.find(decoded['user_id'])
        return render json: { error:"Usuario no encontrado"}, status:404 unless confirm_token
        return render json: { error: "Usuario ya confirmado" }, status:400 if @user.isActive
        
        @user.update!(isActive:true)
        create_refresh
    end

    def current
        user = User.find(request.headers["User-Id"]&.to_i)
        if user != nil && user.errors != nil
            render json: user.as_json
        else
            pp user.errors
            Rails.logger.error "ERROR: #{user.errors}"
            render json: { error: "Error al cargar el usuario" }
        end
    end

    def user_params
        params.permit(:username, :email, :password, :image)
    end

    def create_refresh
        family_id = SecureRandom.uuid
        refresh_token = TokenService.generate_refresh_token(@user, family_id)

        session = RefreshSession.find_or_initialize_by(user_id: @user.id, device_id: params[:device_id])

        session.update!(
        family_id: family_id,
        current_token_hash: Digest::SHA256.hexdigest(refresh_token),
        revoked: false,
        session_version: @user.session_version,
        last_used_at: Time.current
        )
        access_token = JWT.encode(@user.to_access_token, ENV.fetch("JWT_SECRET"))
        render json: @user.as_json.merge(token: access_token, refresh_token: refresh_token)
    end

    def refresh
        refresh_token = request.headers["X-Refresh-Token"]
        return render json: { error:"token not found"}, status: :unauthorized unless refresh_token
        payload = JWT.decode(refresh_token, ENV.fetch("JWT_SECRET_REFRESH")).first
        # pp payload
        return render json: { error:"invalid token"}, status: :unauthorized unless payload

        session = RefreshSession.find_by(family_id: payload["family_id"],user_id: payload["user_id"])
        # pp session 
        return render json: { error:"Session no encontrada"}, status: :unauthorized unless session
        return render json: { error:"Session revocada"}, status: :unauthorized if session.revoked

        user = User.find(payload["user_id"])
        if session.session_version != user.session_version
            session.update!(revoked:true)
            return render json: { error:"Session invalida"}, status: :unauthorized 
        end

        if Digest::SHA256.hexdigest(refresh_token) != session.current_token_hash
            session.update!(revoked:true)
            return render json: { error:"Reuso de token detectado"}, status: :unauthorized 
        end

        new_access_token = TokenService.generate_access_token(user)
        new_refresh_token = TokenService.generate_refresh_token(user, payload["family_id"])

        session.update!(current_token_hash: Digest::SHA256.hexdigest(new_refresh_token),last_used_at: Time.current)
        render json: { token: new_access_token, refresh_token: new_refresh_token }
        
        rescue JWT::DecodeError
            render json: { error: "Unauthorized" }, status: :unauthorized
    end

    def logout
        device_id = params[:device_id]
        RefreshSession.where(user_id: request.headers["User-Id"]&.to_i, device_id: params[:device_id]).update_all(revoked: true)
        cookies.delete(:refresh_token)
        render json: { error:"Session cerrada"}  
    end

    def logoutAll
        user = User.find(request.headers["User-Id"]&.to_i)
        user.increment!(:session_version)
        user.refresh_sessions.update_all(revoked: true)
        cookies.delete(:refresh_token)
        render json: { error:"Sessiones cerradas" } 
    end



    def set_refresh_cookie(token)
        cookies[:refresh_token] = {
        value: token,       
        httponly: true,
        secure: Rails.env.production?,
        same_site: :strict,
        expires: 15.days.from_now
        }
    end
end
