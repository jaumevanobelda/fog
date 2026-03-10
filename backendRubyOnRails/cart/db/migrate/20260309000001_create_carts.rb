class CreateCarts < ActiveRecord::Migration[8.1]
  def change
    create_table :carts do |t|
			t.integer :user_id, null: false
			t.timestamps
			t.string :status,null: false, default: 'PENDING'
    end
    add_index :carts, :status
    add_index :carts, :user_id, unique: true 
  end
end
