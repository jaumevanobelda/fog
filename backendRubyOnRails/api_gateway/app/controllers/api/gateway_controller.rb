module Api
    class GatewayController < ApplicationController
        CATEGORIES_SERVICE   = "http://localhost:3001"
        GAMES_SERVICE = "http://localhost:3002"
        AUTH_SERVICE = "http://localhost:3003"
        CART_SERVICE = "http://localhost:3004"
        ORDERS_SERVICE = "http://localhost:3005"
        before_action -> { authenticate(["ADMIN","SUPERADMIN"]) }, only: %i[post_categoria put_categoria delete_categoria activate_categoria activate_game createUser getUsers editActiveUser]
        before_action -> { authenticate([ "ADMIN","SUPERADMIN","DEVELOPER" ]) }, only: %i[get_game get_games post_game put_game delete_game]
        before_action -> { cookies.delete(:refresh_token) }, only: %i[ logout]
        before_action -> { authenticate() }, only: %i[current logout logoutAll clear_cart remove_from_cart get_cart add_to_cart create_checkout_order confirm_order cancel_order]
        def login
            proxy(:post, "#{AUTH_SERVICE}/auth/login")
        end

        def register
            proxy(:post, "#{AUTH_SERVICE}/auth/register")
        end
        
        def confirm
            proxy(:post, "#{AUTH_SERVICE}/auth/confirm")
        end

        def current
            proxy_get("#{AUTH_SERVICE}/auth/current")
        end

        def refresh
            proxy(:post, "#{AUTH_SERVICE}/auth/refresh")
        end

        def logout
            pp "Logout"
            proxy(:post, "#{AUTH_SERVICE}/auth/logout")
        end

        def logoutAll
            cookies.delete(:refresh_token)
            proxy(:post, "#{AUTH_SERVICE}/auth/logoutAll")
        end

        def createUser
            proxy(:post, "#{AUTH_SERVICE}/auth/createUser")
        end

        def getUsers
            proxy_get("#{AUTH_SERVICE}/auth/getUsers")
        end
        
        def editActiveUser
            proxy(:put, "#{AUTH_SERVICE}/auth/editActiveUser")
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

        def add_to_cart
            proxy(:put, "#{CART_SERVICE}/cart")
        end

        def get_cart
            proxy_get("#{CART_SERVICE}/cart")
        end

        def remove_from_cart
            proxy(:delete, "#{CART_SERVICE}/cart/#{params[:slug]}")
        end

        def clear_cart
            proxy(:delete, "#{CART_SERVICE}/cart")
        end

        def create_checkout_order
            proxy(:post, "#{ORDERS_SERVICE}/order/checkout")
        end

        def confirm_order
            proxy(:post, "#{ORDERS_SERVICE}/order/confirm")
        end
        def cancel_order
            proxy(:post, "#{ORDERS_SERVICE}/order/cancel")  
        end

        def authenticate(allowed_roles = [])
            token = request.headers["Authorization"]&.split(" ")&.last
            return render json: { error: "No token" }, status: :unauthorized unless token

            decoded = JWT.decode(token, ENV.fetch("JWT_SECRET"), true, algorithm: "HS256")
            @user_id = decoded[0]["user_id"]
            @role = decoded[0]["role"]
            user = User.find(decoded[0]["user_id"])
            render json: {error:"User not found"}, status:401 if user.nil?
            render json: {error:"User not active"}, status:401 if user.isActive == false
            if allowed_roles.length > 0  && (allowed_roles && Array(@role)).any? == false
                pp allowed_roles
                pp Array(@role)
                render json: { error: "Forbidden" }, status: :forbidden
            end

        rescue JWT::DecodeError => error
            pp error
            render json: { error: "Unauthorized" }, status: :unauthorized
        end

        def proxy(method, url)
            body = request.raw_post.present? ? JSON.parse(request.raw_post) : {}
            headers = {}
            headers["Content-Type"] = "application/json"
            headers["User-Id"] = @user_id.to_s if @user_id
            headers["User-Role"] = @role if @role
            headers["X-Refresh-Token"] = cookies[:refresh_token] if cookies[:refresh_token]
            response = Faraday.run_request(method, url, body.to_json, headers)

            parsed = JSON.parse(response.body)
            if response.status == 200 && parsed.is_a?(Hash) &&  parsed["refresh_token"] != nil
                set_refresh_cookie(parsed["refresh_token"])
                parsed.delete("refresh_token")
            end
            render json: parsed, status: response.status
        end

        def set_refresh_cookie(token)
            cookies[:refresh_token] = {
                value: token,
                httponly: true,
                secure: Rails.env.production?,
                same_site: :lax,
                expires: 15.days.from_now
            }
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
