module Api
    class GatewayController < ApplicationController
        AUTH_SERVICE   = "http://localhost:3001"
        GAMES_SERVICE = "http://localhost:3002"
        before_action -> { authenticate("ADMIN") }, only: %i[games ]

        def login
            proxy(:post, "#{AUTH_SERVICE}/api/auth/login")
        end

        def register
            proxy(:post, "#{AUTH_SERVICE}/api/auth/register")
        end

        def games
            proxy_get("#{GAMES_SERVICE}/api/games")
          # response = Faraday.get("#{GAMES_SERVICE}/api/games")
          # render json: JSON.parse(response.body)
        end


        #   UTILS

        def authenticate(*allowed_roles)
            token = request.headers["Authorization"]&.split(" ")&.last

            return render json: { error: "No token" }, status: :unauthorized unless token

            decoded = JWT.decode(token, ENV.fetch("JWT_SECRET"), true, algorithm: "HS256")
            @user_id = decoded[0]["user_id"]
            @role = decoded[0]["role"]
            if (allowed_roles & Array(@role)).any? == false
                render json: { error: "Forbidden" }, status: :forbidden
            end
            rescue JWT::DecodeError
                render json: { error: "Unauthorized" }, status: :unauthorized
            end


        def proxy(method, url)
            body = JSON.parse(request.raw_post)
            # body.merge!(user_id: @user_id) if @user_id
            # body.merge!(role: @role) if @role
            headers = {}
            headers["Content-Type"] = "application/json"
            headers["User-Id"] = @user_id.to_s if @user_id
            headers["User-Role"] = @role if @role
            response = Faraday.run_request(method, url, body.to_json,headers)
            render json: JSON.parse(response.body), status: response.status
        end

        def proxy_get(url)
            params = request.query_parameters
            params = params.merge(user_id: @user_id) if @user_id
            response = Faraday.get(url) do |req|
                # req.headers["Authorization"] = request.headers["Authorization"] if request.headers["Authorization"]
                req.headers["Content-Type"] = "application/json"
                req.headers["User-Id"] = @user_id.to_s if @user_id
                req.headers["User-Role"] = @role if @role
                req.params = params
            end
            render json: JSON.parse(response.body), status: response.status
        end
    end
end
#   def proxy_post(url)
#     body = JSON.parse(request.raw_post).merge(@user_id?)

#     response = Faraday.post(url) do |req|
#         req.headers["Content-Type"] = "application/json"
#         req.body = body.to_json
#     end
#     render json: response.body, status: response.status
#   end
