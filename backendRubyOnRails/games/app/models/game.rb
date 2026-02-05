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

    scope :filter_by_precio, ->(minPrecio, maxPrecio) {
        return all if maxPrecio.nil?
        where("precio >= ? AND precio <= ?", minPrecio || 0, maxPrecio)
    }

    scope :filter_by_search, ->(search) {
        return all if search.nil? || search == ""
        where("LOWER(NOM) LIKE ?", "%#{search.to_s.downcase}%")
    }

    scope :filter_by_categories, ->(categories) {
        return all if categories.nil? || categories == ""
        joins(:categories).where(categories: { slug: categories.split(',') }).distinct
    }

    scope :sort_by_field, ->(sortField,sortAsc = true) {
        return all if sortField.nil? 
        sortOrder= sortAsc == "true" ? :asc : :desc
        case sortField 
        when 'precio'
            order(precio: sortOrder )
        when 'nom'
            order(nom: sortOrder )
        else
            all
        end
    }

end
