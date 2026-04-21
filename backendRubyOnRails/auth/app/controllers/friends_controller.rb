class FriendsController < ApplicationController
    before_action :set_user, only: %i[getFriends getFriendRequests getSendedFriendRequests acceptFriendRequest rejectFriendRequest]
    before_action :set_target_user, only: %i[sendFriendRequest acceptFriendRequest rejectFriendRequest]


	def getFriends
		friends = @user.friends
		return render json: friends.as_json,status:200
	end

	def getFriendRequests
		friendRequests = @user.friend_requests.where(status:"PENDING")
		return render json: friendRequests.as_json,status:200
	end

	def getSendedFriendRequests
		friendRequests = @user.sended_friend_requests.where(status:"PENDING")
		return render json: friendRequests.as_json("target_user"),status:200
	end

	def sendFriendRequest
		previosFriendRequest = @targetUser.sended_friend_requests.find_by_target_user_id(request.headers["User-Id"])
		if previosFriendRequest != nil 
			previosFriendRequest.update(status:"ACCEPTED")
			return create_friend(request.headers["User-Id"],@targetUser.id)
		end
		friendRequest = FriendRequest.new({target_user_id:@targetUser.id,sender_user_id:request.headers["User-Id"]})

		if friendRequest.save 
			return render json: {message:"Solicitud enviada"},status:200
		else
			return render json: {error: friendRequest.errors.map(&:message).join(" ")},status:400
		end
	end

	def acceptFriendRequest
		friendRequest = @user.friend_requests.find_by_sender_user_id(@targetUser.id)
        return render json: { error: "No se ha encontrado la solicitud del otro usuario" } if friendRequest == nil
		friendRequest.update(status:"ACCEPTED")
		return create_friend(request.headers["User-Id"],@targetUser.id)
	end

	def rejectFriendRequest
		friendRequest = @user.friend_requests.find_by_sender_user_id(@targetUser.id)
        return render json: { error: "No se ha encontrado la solicitud del otro usuario" } if friendRequest == nil
		friendRequest.update(status:"REJECTED")
	end


	def set_user
        @user = User.find(request.headers["User-Id"])
        return render json: { error: "No se ha encontrado el usuario" },status:404 if @user == nil
    end

	def set_target_user
        @targetUser = User.find_by_username(params[:username])
        return render json: { error: "No se ha encontrado el usuario" },status:404 if @user == nil
    end

	def create_friend(target_user_id,friend_id)
		target_friend = Friend.new({target_user_id:target_user_id,friend_id:friend_id})
		friend = Friend.new({target_user_id:friend_id,friend_id:target_user_id})
		if target_friend.save && friend.save
			return render json: {message:"Añadido como amigo"},status:200
		else
			return render json: {error:"Ha ocurrido un error inseperado"},status:400
		end
	end
end
