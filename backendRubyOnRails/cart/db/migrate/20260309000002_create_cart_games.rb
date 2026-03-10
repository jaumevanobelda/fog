class CreateCartGames < ActiveRecord::Migration[8.1]
	def change
		create_table :cart_games do |t|
			t.references :cart, null: false, foreign_key: true
			t.integer :game_id, null: false
			t.timestamps
	end
	add_index :cart_games, [ :cart_id, :game_id ], unique: true
  end
end
