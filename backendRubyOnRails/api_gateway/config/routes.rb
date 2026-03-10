Rails.application.routes.draw do
  namespace :api do
    scope  :auth do
      post "login", to: "gateway#login"
      post "register", to: "gateway#register"
      post "refresh", to: "gateway#refresh"
      post "logout", to: "gateway#logout"
      post "logoutAll", to: "gateway#logoutAll"
      get "current", to:"gateway#current"
    end

    scope :categoria do
      post "", to: "gateway#post_categoria"
      get "", to: "gateway#get_categories"
      get ":slug", to: "gateway#get_categoria"
      put ":slug", to: "gateway#put_categoria"
      delete ":slug", to: "gateway#delete_categoria"
      put "activate/:slug", to: "gateway#activate_categoria"
    end

    scope :game do
      post "", to: "gateway#post_game"
      get "", to: "gateway#get_games"
      get "filter", to: "gateway#get_filtered_games"
      get ":slug", to: "gateway#get_game"
      put ":slug", to: "gateway#put_game"
      delete ":slug", to: "gateway#delete_game"
      put "activate/:slug", to: "gateway#activate_game"
    end
    scope :cart do
      put "", to: "gateway#add_to_cart"
      get "", to: "gateway#get_cart" 
      delete ":slug", to: "gateway#remove_from_cart"
      delete "", to: "gateway#clear_cart"
    end
    
    
  end
end
