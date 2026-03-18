class Library < ApplicationRecord
  belongs_to :user,  primary_key: :id, foreign_key: :user_id
  belongs_to :game

  validates :user_id, presence: true
  validates :game_id, presence: true

end
