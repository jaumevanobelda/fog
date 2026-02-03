class CreateCategories < ActiveRecord::Migration[8.1]
  def up
    create_table :categories do |t|
      t.string  :nom
      t.boolean :isActive, default: true, null: false
      t.string  :slug
      t.timestamps
    end unless table_exists?(:categories)

    add_index :categories, :slug, unique: true unless index_exists?(:categories, :slug)
  end

  def down
    drop_table :categories if table_exists?(:categories)
  end
end
