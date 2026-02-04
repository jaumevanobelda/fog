class Category < ApplicationRecord
    before_save :generate_slug

    validates :nom, presence: true
    validates :slug, uniqueness:true

    def generate_slug
        self.slug = nom.parameterize
    end
    
    def as_json
        super({ only: %i[nom slug isActive] })
        # super({ only: %i[nom slug] }.merge(options || {}))
    end
end
