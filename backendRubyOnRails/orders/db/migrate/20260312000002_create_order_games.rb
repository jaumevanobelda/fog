class CreateOrderGames < ActiveRecord::Migration[8.1]
  def change
    create_table :order_games, if_not_exists: true do |t|
      t.references :order, null: false, foreign_key: true
      t.integer :game_id, null: false
      t.integer :price, null: false, default: 0

      t.timestamps
    end
	
    add_index :order_games, :game_id, if_not_exists: true
  end
end
