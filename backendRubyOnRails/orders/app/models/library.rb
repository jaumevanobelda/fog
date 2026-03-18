class Library < ApplicationRecord
  belongs_to :user,  primary_key: :id, foreign_key: :user_id
  belongs_to :game

  validates :user_id, presence: true
  validates :game_id, presence: true
  validates :game_id, uniqueness: { scope: :user_id, message: 'El juego ya pertenece a la biblioteca' }


  before_create :set_purchased_at

  def set_purchased_at
    self.purchased_at = Time.current
  end

end
