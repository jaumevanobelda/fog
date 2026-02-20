module Api
    class GatewayController < ApplicationController
        CATEGORIES_SERVICE   = "http://localhost:3001"
        GAMES_SERVICE = "http://localhost:3002"
        AUTH_SERVICE = "http://localhost:3003"
        before_action -> { authenticate("ADMIN") }, only: %i[post_categoria put_categoria delete_categoria activate_categoria activate_game ]
        before_action -> { authenticate(["ADMIN","DEVELOPER"]) }, only: %i[get_game get_games post_game put_game delete_game]
        before_action -> { authenticate() }, only: %i[current]
        def login
            proxy(:post, "#{AUTH_SERVICE}/auth/login")
        end

        def register
            proxy(:post, "#{AUTH_SERVICE}/auth/register")
        end

        def current
            proxy_get("#{AUTH_SERVICE}/auth/current")
        end

        def get_categoria
            proxy_get("#{CATEGORIES_SERVICE}/categoria/#{params[:slug]}")
        end

        def get_categories
            proxy_get("#{CATEGORIES_SERVICE}/categories")
        end

        def post_categoria
            proxy(:post, "#{CATEGORIES_SERVICE}/categories")
        end

        def put_categoria
            proxy(:put, "#{CATEGORIES_SERVICE}/categories/#{params[:slug]}")
        end

        def delete_categoria
            proxy(:delete, "#{CATEGORIES_SERVICE}/categories/#{params[:slug]}")
        end

        def activate_categoria
            proxy(:put, "#{CATEGORIES_SERVICE}/categories/activate/#{params[:slug]}")
        end

        def get_game
            proxy_get("#{GAMES_SERVICE}/game/#{params[:slug]}")
        end

        def get_games
            proxy_get("#{GAMES_SERVICE}/game")
        end

        def get_filtered_games
            proxy_get("#{GAMES_SERVICE}/game/filter")
        end

        def post_game
            proxy(:post, "#{GAMES_SERVICE}/game")
        end

        def put_game
            proxy(:put, "#{GAMES_SERVICE}/game/#{params[:slug]}")
        end

        def delete_game
            proxy(:delete, "#{GAMES_SERVICE}/game/#{params[:slug]}")
        end

        def activate_game
            proxy(:put, "#{GAMES_SERVICE}/game/activate/#{params[:slug]}")
        end


        #   UTILS

        def authenticate(allowed_roles = [])
            token = request.headers["Authorization"]&.split(" ")&.last

            return render json: { error: "No token" }, status: :unauthorized unless token

            decoded = JWT.decode(token, ENV.fetch("JWT_SECRET"), true, algorithm: "HS256")
            @user_id = decoded[0]["user_id"]
            @role = decoded[0]["role"]
            if allowed_roles.length > 0  && (allowed_roles && Array(@role)).any? == false
                pp allowed_roles
                pp Array(@role)
                render json: { error: "Forbidden" }, status: :forbidden
            end
            rescue JWT::DecodeError
                render json: { error: "Unauthorized" }, status: :unauthorized
            end


        def proxy(method, url)
            body = request.raw_post.present? ? JSON.parse(request.raw_post) : {}
            # body.merge!(user_id: @user_id) if @user_id
            # body.merge!(role: @role) if @role
            headers = {}
            headers["Content-Type"] = "application/json"
            headers["User-Id"] = @user_id.to_s if @user_id
            headers["User-Role"] = @role if @role
            response = Faraday.run_request(method, url, body.to_json, headers)
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
