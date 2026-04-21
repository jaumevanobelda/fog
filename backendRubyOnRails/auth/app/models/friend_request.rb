class FriendRequest < ApplicationRecord
  belongs_to :target_user, class_name: "User"
  belongs_to :sender_user, class_name: "User"

  validates :status, inclusion: { in: %w[PENDING ACCEPTED REJECTED] }
  validates :sender_user_id, uniqueness: { 
    scope: :target_user_id, 
    message: "ya ha enviado una petición a este usuario" 
  }

  def as_json(user = "sender_user")
		if user == "sender_user"
			return User.find(sender_user_id)
		else
			return User.find(target_user_id)
		end
	end
end
