class OrderGame < ApplicationRecord
  belongs_to :order

  validates :game_id, presence: true
  validates :price, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

end
