class Game < ApplicationRecord
    before_save :generate_slug

    validates :slug, uniqueness:true

    validates :nom, presence: true
    validates :descripcion, presence: true
    validates :precio, presence: true
    validates :developer, presence: true
    
    


    def generate_slug
        self.slug = nom.parameterize
    end

    def deactivate
        self.isActive = false
    end

    def as_json
        super({ only: %i[slug nom descripcion precio developer isActive ] })
    end
end
