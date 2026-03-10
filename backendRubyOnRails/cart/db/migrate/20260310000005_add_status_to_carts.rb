class AddStatusToCarts < ActiveRecord::Migration[8.1]
  def change
    unless column_exists?(:carts, :status)
      add_column :carts, :status, :string, null: false, default: 'PENDING'
      add_index :carts, :status
    end
  end
end
