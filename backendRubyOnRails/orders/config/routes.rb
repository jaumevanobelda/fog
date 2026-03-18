Rails.application.routes.draw do
  scope :order do
    post "checkout", to: "order#create_checkout_order"
    post "confirm", to: "order#confirm_order"
    post "cancel", to: "order#cancel_order"

  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
