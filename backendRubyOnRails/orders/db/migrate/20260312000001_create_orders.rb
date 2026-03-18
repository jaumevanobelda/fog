class CreateOrders < ActiveRecord::Migration[8.1]
  def change
    create_table :orders do |t|
      t.integer :user_id, null: false
      t.string :stripe_session_id
      t.integer :total_price, null: false, default: 0
      t.string :status, null: false, default: 'PENDING'

      t.timestamps
    end

    add_index :orders, :user_id
    add_index :orders, :stripe_session_id, unique: true
  end
end
