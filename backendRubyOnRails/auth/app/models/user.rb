class User < ApplicationRecord
    before_save :generate_foto
    before_save :parameterize_username

    has_secure_password
    attribute :role, :string, default: "CLIENT"

    has_many :refresh_sessions, dependent: :destroy
    
    has_many :sended_friend_requests, class_name: "FriendRequest", foreign_key: "sender_user_id", dependent: :destroy
    has_many :friend_requests, class_name: "FriendRequest", foreign_key: "target_user_id", dependent: :destroy
    
    has_many :friends, class_name: "Friend", foreign_key: "target_user_id", dependent: :destroy

    validates :username, :email, presence: true 
    validates :password, presence: true, on: :create
    
    validates :email,:username,on: :create,  uniqueness: { message: "%{value} ya esta en uso" }

    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP ,message: "invalido"}

    def generate_foto
        if self.foto == nil || self.foto.start_with?("https://dummyimage.com")
            self.foto = "https://dummyimage.com/250x250&text=#{self.username.parameterize}"
        end
    end

    def parameterize_username
        self.username = self.username.parameterize
    end

    scope :by_username_or_email, ->(value) { where("username = ? OR email = ?", value, value) }


    def to_access_token
        { user_id: id, role: role, exp: 15.minutes.from_now.to_i }
    end

    def to_refresh_token(family_id)
        { user_id: id, family_id: family_id, exp: 15.days.from_now.to_i }
    end

    def as_json(options = {})
        super({ only: %i[username email role foto ]}.merge(options || {}))
    end
end
