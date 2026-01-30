class Categoria < ApplicationRecord
    before_save :generate_slug
    before_save :defineIsActive
    # validates :id, presence: true
    validates :nom, presence: true
    validates :slug, uniqueness:true

    def generate_slug
        self.slug = nom.parameterize
    end

    def defineIsActive
        self.isActive = true if self.isActive == nil
    end

    def deactivate
        self.isActive = false
    end

    def as_json
        super({ only: %i[nom slug isActive] })
        # super({ only: %i[nom slug] }.merge(options || {}))
    end
end
