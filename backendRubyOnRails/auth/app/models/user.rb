class User < ApplicationRecord
    before_save :generate_foto
    has_secure_password
    validates :username, :email, :password, presence: true
    validates :email, :username, uniqueness: true, on: :create

    def generate_foto
        if self.foto == nil || self.foto.start_with("https://dummyimage.com")
            self.foto = "https://dummyimage.com/250x250&text=#{self.username.parameterize}"
        end
    end
    
    scope :by_username_or_email, ->(value) { where("username = ? OR email = ?", value, value) }

    
    def to_token
        return {user_id: id,role: role,exp: 24.hours.from_now.to_i}
    end

    def as_json
        super({ only: %i[username email role foto] })
    end
end
