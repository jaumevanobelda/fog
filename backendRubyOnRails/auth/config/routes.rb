Rails.application.routes.draw do
  scope :auth do
    post 'register', to: 'auth#register'
    post 'login', to: 'auth#login'
    post 'confirm', to: 'auth#confirm'
    get 'current', to: 'auth#current'
    post 'refresh', to: 'auth#refresh'
    post 'logout', to: 'auth#logout'
    post 'logoutAll', to: 'auth#logoutAll'
    post 'createUser', to: 'admin_panel#createUser'
    get 'getUsers', to: 'admin_panel#getUsers'
    put 'editActiveUser', to: 'admin_panel#editActiveUser'

    scope :friends do 
      get '', to: 'friends#getFriends'
      get 'request', to: 'friends#getFriendRequests'
      get 'request/sended', to: 'friends#getSendedFriendRequests'
      post 'request/send/:username', to: 'friends#sendFriendRequest'
      post 'request/accept/:username', to: 'friends#acceptFriendRequest'
      post 'request/reject/:username', to: 'friends#rejectFriendRequest'
    end




  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
