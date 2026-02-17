class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      # t.string :password
      t.string :password_digest
      t.string :role, default: "CLIENT", null: false
      t.string :foto
      t.index :username, unique: true
      t.index :email, unique: true
      t.timestamps
    end
    # add_index :users, :username, unique: true unless index_exists?(:users, :username)
  end
end
