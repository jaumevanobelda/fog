class CartGame < ApplicationRecord
  belongs_to :user_cart, class_name: 'UserCart', foreign_key: 'cart_id', inverse_of: :cart_games

  validates :game_id, presence: true
  validates :game_id, uniqueness: { scope: :cart_id }
  def as_json 
    pp Game.find(self.game_id)[:slug]
    Game.find(self.game_id)[:slug]
  end
end
