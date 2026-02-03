class CreateGameCategories < ActiveRecord::Migration[8.1]
  def change
    create_table :game_categories do |t|
      t.references :game, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
    add_index :game_categories, [:game_id, :category_id], unique: true
  end
end
