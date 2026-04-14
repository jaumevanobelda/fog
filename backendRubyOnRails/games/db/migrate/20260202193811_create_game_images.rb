class CreateGameImages < ActiveRecord::Migration[8.1]
  def change
    create_table :game_images, if_not_exists: true do |t|
      t.references :game, null: false, foreign_key: true
      t.string :image

      t.timestamps
    end
  end
end
