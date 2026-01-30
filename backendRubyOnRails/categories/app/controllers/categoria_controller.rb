class CategoriaController < ApplicationController
    before_action :set_categoria, only: %i[show update destroy]
    def index
        render json: Categoria.all
    end

    def show
        render json: @categoria.as_json
    end

    def create
        categoria = Categoria.new(categoria_params)
        if categoria.save
            render json: categoria, status: :created
        else
            render json: { errors: categoria.errors }, status: :unprocessable_entity
        end
    end

    def update
        if @categoria.update(categoria_params)
            render json: @categoria
        else
            render json: { errors: @categoria.errors }, status: :unprocessable_entity
        end
    end
    
    def destroy
        @categoria.deactivate
        render json: { message: "Categoria desactivada" }
    end

    def categoria_params
        params.require(:categoria).permit(:nom, :isActive)
    end

    def set_categoria
        @categoria = Categoria.find_by_slug(params[:id])
        render json: {error:"No se ha encontrado la categoria"} if @categoria == nil 
    end
end
