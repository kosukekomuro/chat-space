Rails.application.routes.draw do
  devise_for :users
  root 'comments#index'
  resources :users, only: [:edit, :update]
end
