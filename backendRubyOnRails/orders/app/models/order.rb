class Order < ApplicationRecord
  has_many :order_games, dependent: :destroy

  validates :user_id, presence: true
  validates :status, presence: true, inclusion: { in: %w[PENDING SUCCEDED FAILED CANCELLED] }
  validates :total_price, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

end
