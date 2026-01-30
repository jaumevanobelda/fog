class CreateCategoria < ActiveRecord::Migration[8.1]
  def up
    create_table :categoria do |t|
      t.string  :nom
      t.boolean :isActive, default: true, null: false
      t.string  :slug
      t.timestamps
    end unless table_exists?(:categoria)

    add_index :categoria, :slug, unique: true unless index_exists?(:categoria, :slug)
  end

  def down
    drop_table :categoria if table_exists?(:categoria)
  end
end
