class CreateGameImages < ActiveRecord::Migration[8.1]
  def change
    create_table :game_images do |t|
      t.references :game, null: false, foreign_key: true
      t.string :image

      t.timestamps
    end
  end
end
