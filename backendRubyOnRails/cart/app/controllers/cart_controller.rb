class CartController < ApplicationController
    before_action :set_cart, only: %i[index addToCart destroy clearCart]

    def index
        render json: { cart: @cart.cart_games.as_json }
    end

    def addToCart
        user = User.find(request.headers["User-Id"]&.to_i)
        game_id = Game.find_by(slug: params[:slug])[:id]
        repeated_game = user.libraries.find_by(game_id: game_id)
        pp "repeated_game"
        pp repeated_game
        return render json: { error: "El juego #{Game.find(repeated_game.game_id).nom} ya esta en tu biblioteca" }, status: 400 if repeated_game != nil

        created_game = @cart.cart_games.create(game_id: game_id)
        if created_game.persisted?
            render json: { cart: @cart.cart_games }
        else
            pp created_game.errors.full_messages
            render json: { error: "El juego ya está en el carrito" }, status: :unprocessable_entity
        end
    end

    def destroy
        game = @cart.cart_games.find_by(game_id: Game.find_by(slug: params[:slug])[:id])      
        pp "game"
        pp game
        return render json: { error: "El juego no está en el cart" },status: 404 if game == nil
        if game.destroy
            return render json: { cart: @cart.cart_games.as_json }
        else
            pp game.errors
            render json: { errors: game.errors }, status: :unprocessable_entity
        end
    end

    def clearCart 
        if @cart.update(status: "ACCEPTED")
            pp "Cart"
            pp @cart
            render json: {cart:"Cart eliminado"}
        else
            pp @cart.errors
            render json: { errors: @cart.errors }, status: :unprocessable_entity
        end
    end

    def set_cart
        @cart = UserCart.find_or_create_by(user_id: request.headers["User-Id"]&.to_i, status: "PENDING")
        pp @cart
        render json: { error: "Ha ocurrido un error con el carrito" } if @cart == nil
    end
end
