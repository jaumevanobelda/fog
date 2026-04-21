class CreateFriendRequests < ActiveRecord::Migration[8.1]
  def change
    create_table :friend_requests, if_not_exists: true do |t|
      t.references :target_user, null: false, foreign_key: { to_table: :users }
      t.integer :sender_user_id, null: false
      t.string :status, default: 'PENDING', null: false
      
      t.timestamps
    end
    
    add_foreign_key :friend_requests, :users, column: :sender_user_id, if_not_exists: true
    add_index :friend_requests, [:sender_user_id, :target_user_id], unique: true, if_not_exists: true
  end
end
