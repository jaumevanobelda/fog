class CategoriesController < ApplicationController
    before_action :set_category, only: %i[show update destroy activate]
    def index
        render json: Category.all
    end

    def show
        render json: @category.as_json
    end

    def create
        category = Category.new(category_params)
        if category.save
            render json: category, status: :created
        else
            render json: { errors: category.errors }, status: :unprocessable_entity
        end
    end

    def update
        if @category.update(category_params)
            render json: @category
        else
            render json: { errors: @category.errors }, status: :unprocessable_entity
        end
    end

    def destroy
        @category.update({ isActive: false })
        render json: { message: "Categoria desactivada" }
    end

    def activate
        @category.update({ isActive: true })
        render json: { message: "Categoria activada" }
    end

    def category_params
        params.require(:categoria).permit(:nom)
    end
    
    def set_category
        @category = Category.find_by_slug(params[:slug])
        render json: { error: "No se ha encontrado la categoria" } if @category == nil
    end
end
