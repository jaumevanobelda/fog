Rails.application.routes.draw do
  namespace :api do
    scope  :auth do
      post "login", to: "gateway#login"
      post "register", to: "gateway#register"
    end

    scope :games do
      get "", to: "gateway#games"
    end
  end
end
