class RemoveUniqueIndexFromCartsUserId < ActiveRecord::Migration[8.1]
  def change
    if index_exists?(:carts, :user_id, unique: true)
      remove_index :carts, column: :user_id
    elsif index_exists?(:carts, :user_id)
      remove_index :carts, column: :user_id
    end
    unless index_exists?(:carts, :user_id, unique: false)
      add_index :carts, :user_id
    end
  end
end
