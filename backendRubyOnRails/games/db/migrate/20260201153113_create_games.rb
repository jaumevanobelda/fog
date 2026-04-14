class CreateGames < ActiveRecord::Migration[8.1]
  def change
    create_table :games, if_not_exists: true do |t|
      t.string :slug
      t.string :nom
      t.boolean :isActive, default: true, null: false
      t.string :descripcion
      t.integer :precio
      t.integer :developer 

      t.timestamps
    end
    add_index :games, :slug, unique: true, if_not_exists: true unless index_exists?(:games, :slug)
  end
end
