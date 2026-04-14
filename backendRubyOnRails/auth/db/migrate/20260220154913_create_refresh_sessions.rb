class CreateRefreshSessions < ActiveRecord::Migration[8.1]
  def change
    create_table :refresh_sessions, if_not_exists: true do |t|
      t.references :user, null: false, foreign_key: true
      t.string :device_id, null: false
      t.string :family_id, null: false
      t.string :current_token_hash, null: false
      t.boolean :revoked, default: false, null: false
      t.integer :session_version, null: false
      t.datetime :last_used_at

      t.timestamps
    end

    add_index :refresh_sessions, :family_id, unique: true, if_not_exists: true
    add_index :refresh_sessions, [:user_id, :device_id], if_not_exists: true
  end
end
