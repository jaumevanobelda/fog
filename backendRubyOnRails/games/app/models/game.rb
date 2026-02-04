class Game < ApplicationRecord
    before_save :generate_slug

    validates :slug, uniqueness: true

    validates :nom, presence: true
    validates :descripcion, presence: true
    validates :precio, presence: true
    validates :developer, presence: true

    has_many :game_categories, dependent: :destroy
    has_many :categories, through: :game_categories
    has_many :game_images, dependent: :destroy
    def generate_slug
        self.slug = nom.parameterize
    end
    
    def as_json
        super({ only: %i[slug nom descripcion precio developer isActive ] }).merge(
        categories: categories.pluck(:slug), images: game_images.pluck(:image))
    end
end
