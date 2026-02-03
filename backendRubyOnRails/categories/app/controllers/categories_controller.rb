class CategoriesController < ApplicationController
    before_action :set_category, only: %i[show update destroy]
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
        @category.deactivate
        render json: { message: "Category desactivada" }
    end

    def category_params
        params.require(:categoria).permit(:nom, :isActive)
    end

    def set_category
        @category = Category.find_by_slug(params[:id])
        render json: {error:"No se ha encontrado la category"} if @category == nil 
    end
end
