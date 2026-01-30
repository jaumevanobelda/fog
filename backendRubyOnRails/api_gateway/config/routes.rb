Rails.application.routes.draw do
  namespace :api do
    scope  :auth do
      post "login", to: "gateway#login"
      post "register", to: "gateway#register"
    end

    scope :games do
      get "", to: "gateway#games"
    end
    scope :categoria do
      post "", to: "gateway#post_categoria"
      get "", to: "gateway#get_categories"
      get ":slug", to: "gateway#get_categoria"
      put ":slug", to: "gateway#put_categoria"
      delete ":slug", to: "gateway#delete_categoria"
    end
  end
end
