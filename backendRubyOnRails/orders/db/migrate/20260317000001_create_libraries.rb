class CreateLibraries < ActiveRecord::Migration[8.1]
  def change
    create_table :libraries do |t|
      t.integer :user_id, null: false
      t.integer :game_id, null: false
      t.datetime :purchased_at

      t.timestamps
    end

    add_index :libraries, [:user_id, :game_id], unique: true
    add_index :libraries, :game_id
  end
end
