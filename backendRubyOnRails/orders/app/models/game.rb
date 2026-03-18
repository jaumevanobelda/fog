class Game < ApplicationRecord
    has_many :game_images, dependent: :destroy



    # def as_order_game
    #     super({ only: %i[id precio] })
    # end
    def as_order_game
        return {game_id: self.id, price: self.precio * 100}
    end

    # def as_json
    #     super({ only: %i[id precio] })
    # end
end
