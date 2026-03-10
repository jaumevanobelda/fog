class UserCart < ApplicationRecord
  self.table_name = 'carts'
  validates :user_id, presence: true
  validates :status, presence: true

  has_many :cart_games, dependent: :destroy, inverse_of: :user_cart

end
