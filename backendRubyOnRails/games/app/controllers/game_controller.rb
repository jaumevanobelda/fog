class GameController < ApplicationController
    before_action :set_game, only: %i[show update destroy activate]
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
        return render json: { error: "Ya existe un juego con ese nombre" }, status: :conflict if Game.find_by_slug(params[:game][:nom].parameterize)
        game_data = game_params
        game_data[:developer] = request.headers["User-Id"] || 1  # BORRAR
        game = Game.new(game_data)
        if game.save
            game.category_ids = Category.where(slug: params[:game][:categories]).pluck(:id)
            params[:game][:images].each do |image|
                game.game_images.create(image: image)
            end
            render json: game.as_json,  status: :created
        else
            render json: { errors: game.errors }, status: :unprocessable_entity
        end
    end

    def update
        if Game.find_by_slug(params[:game][:nom].parameterize)
            return render json: { error: "Ya existe un juego con ese nombre" }, status: :conflict if params[:game][:nom].parameterize != params[:slug]
        end
        if @game.update(game_params)
            pp params[:game]
            @game.category_ids = Category.where(slug: params[:game][:categories]).pluck(:id)
            @game.game_images.destroy_all
            params[:game][:images].each do |image|
                @game.game_images.create(image: image)
            end
            render json: @game.as_json
        else
            render json: { errors: @game.errors }, status: :unprocessable_entity
        end
    end

    def destroy
        pp @game
        @game.update({ isActive: false })
        pp "DESACTIVADO"
        pp @game
        render json: { message: "Juego desactivado" }
    end

    def activate
        return render json: { error: "No pudes activar juegos" } if request.headers["User-Role"] == "DEVELOPER"
        @game.update({ isActive: true })
        render json: { message: "Juego activado" }
    end

    def game_params
        params.require(:game).permit(:nom, :precio, :descripcion)
    end

    def set_game
        @game = Game.find_by_slug(params[:slug])
        return render json: { error: "No se ha encontrado el juego" } if @game == nil

        if request.headers["User-Role"] == "DEVELOPER"
            pp @game.developer
            pp request.headers["User-Id"]&.to_i
            render json: { error: "No tienes permisos" } if @game.developer&.to_i != request.headers["User-Id"]&.to_i
        end
    end

    def filter
        query = Game.where(isActive: true)
                        .filter_by_precio(params[:minPrecio], params[:maxPrecio])
                        .filter_by_search(params[:search])
                        .filter_by_categories(params[:categories])
                        .sort_by_field(params[:sortField], params[:sortAsc])
        total = query.count
        puts total
        games = query.offset(((params[:page]&.to_i || 1) -1) * (params[:limit]&.to_i || 12)).limit(params[:limit]&.to_i || 12)
        
        render json: { games: games, total: total }
    end
end
