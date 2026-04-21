class Friend < ApplicationRecord
  belongs_to :target_user, class_name: "User"

  validates :friend_id, uniqueness: { 
    scope: :target_user_id, 
    message: "ya es amigo de este usuario" 
  }

  def as_json()
		return User.find(friend_id)
	end
end
