class AddIsActiveToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :isActive, :boolean, default: false, null: false
  end
end
