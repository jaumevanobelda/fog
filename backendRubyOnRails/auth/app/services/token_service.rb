class TokenService

  class << self

    def generate_access_token(user)
      JWT.encode(user.to_access_token, ENV.fetch("JWT_SECRET"))
    end

    def generate_refresh_token(user, family_id)
      JWT.encode(user.to_refresh_token(family_id), ENV.fetch("JWT_SECRET"))
    end
  end
end
