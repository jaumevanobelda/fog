class AuthController < ApplicationController
    def login
        @user = User.by_username_or_email(params[:username]).first
        return render json: { error: "No se ha encontrado el usuario " }, status: :not_found if @user == nil
        return render json: { error: "Contraseña incorrecta" }, status: :unauthorized if !@user&.authenticate(params[:password])
        render_user
    end

    def register
        @user = User.new(user_params)
        if @user.save
            render_user
        else
            render json: { errors: @user.errors }, status: :unprocessable_entity
        end
    end

    def current
        user = User.find(request.headers["User-Id"]&.to_i)
        if user != nil && user.errors != nil
            render json: user
        else
            pp user.errors 
            Rails.logger.error "ERROR: #{user.errors}"
            render json: {error: "Error al cargar el usuario"}
        end
    end

    def user_params
        params.permit(:username, :email, :password, :image)
    end

    def render_user
        token = JWT.encode(@user.to_token, ENV.fetch("JWT_SECRET"))
        render json: @user.as_json.merge(token: token)
    end
end
