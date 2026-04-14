class TokenService

  class << self

    def generate_access_token(user)
      JWT.encode(user.to_access_token, ENV.fetch("JWT_SECRET"))
    end

    def generate_refresh_token(user, family_id)
      JWT.encode(user.to_refresh_token(family_id), ENV.fetch("JWT_SECRET_REFRESH"))
    end

    def generate_confirm_token(user)
      JWT.encode({user_id: user.id,exp: 30.minutes.from_now.to_i}, ENV.fetch("JWT_SECRET_CONFIRM"))
    end
  end
end
