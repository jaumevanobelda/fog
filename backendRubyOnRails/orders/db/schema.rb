# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_03_17_000001) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "cart_games", force: :cascade do |t|
    t.bigint "cart_id", null: false
    t.datetime "created_at", null: false
    t.integer "game_id", null: false
    t.datetime "updated_at", null: false
    t.index ["cart_id", "game_id"], name: "index_cart_games_on_cart_id_and_game_id", unique: true
    t.index ["cart_id"], name: "index_cart_games_on_cart_id"
  end

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "status", default: "PENDING", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["status"], name: "index_carts_on_status"
    t.index ["user_id"], name: "index_carts_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.datetime "created_at"
    t.timestamptz "deleted_at"
    t.boolean "isActive", default: true, null: false
    t.boolean "isactive", default: true
    t.text "nom"
    t.text "slug"
    t.datetime "updated_at"
    t.index ["deleted_at"], name: "idx_categories_deleted_at"
    t.index ["slug"], name: "idx_categories_slug", unique: true
    t.index ["slug"], name: "index_categories_on_slug", unique: true
  end

  create_table "game_categories", force: :cascade do |t|
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.bigint "game_id", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_game_categories_on_category_id"
    t.index ["game_id", "category_id"], name: "index_game_categories_on_game_id_and_category_id", unique: true
    t.index ["game_id"], name: "index_game_categories_on_game_id"
  end

  create_table "game_images", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "game_id", null: false
    t.string "image"
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_images_on_game_id"
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at"
    t.timestamptz "deleted_at"
    t.text "descripcion"
    t.text "developer"
    t.boolean "isActive", default: true, null: false
    t.boolean "is_active", default: true
    t.boolean "isactive", default: true
    t.text "nom"
    t.bigint "precio"
    t.text "slug"
    t.datetime "updated_at"
    t.index ["deleted_at"], name: "idx_games_deleted_at"
    t.index ["slug"], name: "idx_games_slug", unique: true
    t.index ["slug"], name: "index_games_on_slug", unique: true
  end

  create_table "libraries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "game_id", null: false
    t.datetime "purchased_at"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["game_id"], name: "index_libraries_on_game_id"
    t.index ["user_id", "game_id"], name: "index_libraries_on_user_id_and_game_id", unique: true
  end

  create_table "order_games", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "game_id", null: false
    t.bigint "order_id", null: false
    t.integer "price", default: 0, null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_order_games_on_game_id"
    t.index ["order_id"], name: "index_order_games_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "status", default: "pending", null: false
    t.string "stripe_session_id"
    t.integer "total_price", default: 0, null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["stripe_session_id"], name: "index_orders_on_stripe_session_id", unique: true
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "refresh_sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "current_token_hash", null: false
    t.string "device_id", null: false
    t.string "family_id", null: false
    t.datetime "last_used_at"
    t.boolean "revoked", default: false, null: false
    t.integer "session_version", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["family_id"], name: "index_refresh_sessions_on_family_id", unique: true
    t.index ["user_id", "device_id"], name: "index_refresh_sessions_on_user_id_and_device_id"
    t.index ["user_id"], name: "index_refresh_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at"
    t.timestamptz "deleted_at"
    t.text "email"
    t.text "foto"
    t.text "password"
    t.string "password_digest"
    t.text "role"
    t.integer "session_version", default: 0, null: false
    t.datetime "updated_at"
    t.text "username"
    t.index ["deleted_at"], name: "idx_users_deleted_at"
    t.index ["email"], name: "idx_users_email", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "idx_users_username", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "cart_games", "carts"
  add_foreign_key "game_categories", "categories"
  add_foreign_key "game_categories", "categories", name: "fk_game_categories_category"
  add_foreign_key "game_categories", "games"
  add_foreign_key "game_categories", "games", name: "fk_game_categories_game"
  add_foreign_key "game_images", "games"
  add_foreign_key "order_games", "orders"
  add_foreign_key "refresh_sessions", "users"
end
