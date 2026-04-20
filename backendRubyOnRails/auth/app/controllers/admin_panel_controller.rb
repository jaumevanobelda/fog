class AdminPanelController < ApplicationController


	def createUser
        if request.headers["User-Role"] == "ADMIN"
			return render json: { error: "Rol no permitido" },status:403 if  params[:role] != "DEVELOPER"

		elsif request.headers["User-Role"] == "SUPERADMIN"
			return render json: { error: "Rol no permitido" },status:403 if ["DEVELOPER","ADMIN"].include?(params[:role]) == false 
		else
			return render json: { error: "FORBIDEN" },status:403
		end
		user = User.new(user_params.merge({isActive:true,email_verified:true}))
		if user.save
            render json: user,  status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
	end

	def getUsers
	
		if request.headers["User-Role"] == "ADMIN"
			users = User.where("role IN ('CLIENT','DEVELOPER') AND email_verified = true") 
		elsif request.headers["User-Role"] == "SUPERADMIN"
			users = User.where("role IN ('CLIENT','DEVELOPER','ADMIN') AND email_verified = true ") 
		else
			return render json: { error: "FORBIDEN" },status:403
		end

		return render json: users.as_json({ only: %i[username email role foto isActive]}),status:200
	end

	def editActiveUser
		user = User.find_by_username(params[:username])
		if request.headers["User-Role"] == "ADMIN"
			return render json: { error: "Rol no permitido" },status:403 if ["CLIENT","DEVELOPER"].include?(user.role) == false 
		elsif request.headers["User-Role"] == "SUPERADMIN"
			return render json: { error: "Rol no permitido" },status:403 if ["CLIENT","DEVELOPER","ADMIN"].include?(user.role) == false 
		else
			return render json: { error: "FORBIDEN" },status:403
		end
		user.update!(isActive:params[:isActive])

		return render json: {},status:200
	end




	def user_params
        params.permit(:username, :email, :password, :role)
    end


end