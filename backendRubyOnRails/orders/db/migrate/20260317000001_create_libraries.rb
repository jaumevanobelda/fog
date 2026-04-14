class CreateLibraries < ActiveRecord::Migration[8.1]
  def change
    create_table :libraries, if_not_exists: true do |t|
      t.integer :user_id, null: false
      t.integer :game_id, null: false
      t.datetime :purchased_at

      t.timestamps
    end

    add_index :libraries, [:user_id, :game_id], unique: true, if_not_exists: true
    add_index :libraries, :game_id, if_not_exists: true
  end
end
