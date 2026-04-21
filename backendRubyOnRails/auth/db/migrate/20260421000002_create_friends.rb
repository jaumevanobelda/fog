class CreateFriends < ActiveRecord::Migration[8.1]
  def change
    create_table :friends, if_not_exists: true do |t|
      t.references :target_user, null: false, foreign_key: { to_table: :users }
      t.integer :friend_id, null: false

      t.timestamps
    end
    
    add_foreign_key :friends, :users, column: :friend_id, if_not_exists: true
    add_index :friends, [:target_user_id, :friend_id], unique: true, if_not_exists: true
  end
end
