class GameController < ApplicationController
    before_action :set_game, only: %i[show update destroy]
    def index
        if request.headers["User-Role"] == "DEVELOPER"
            render json: Game.where(developer: request.headers["User-Id"])
        else
            render json: Game.all
        end
    end

    def show
        render json: @game.as_json
    end

    def create
        game_data = game_params
        game_data[:developer] = request.headers["User-Id"]
        game = Game.new(game_data) 
        if game.save
            render json:game.as_json,  status: :created
        else
            render json: { errors: game.errors }, status: :unprocessable_entity
        end
    end

    def update
        if @game.update(game_params)
            render json: @game.as_json
        else
            render json: { errors: @game.errors }, status: :unprocessable_entity
        end
    end
    
    def destroy
        @game.deactivate
        render json: { message: "Juego desactivado" }
    end

    def game_params
        params.require(:game).permit(:nom,:precio,:descripcion)
    end

    def set_game
        @game = Game.find_by_slug(params[:id])
        render json: {error:"No se ha encontrado el juego"} if @game == nil 
        
        if request.headers["User-Role"] == "DEVELOPER"
            render json: {error:"No tienes permisos"} if @game.developer != request.headers["User-Id"]&.to_i
        end 
    end


end
