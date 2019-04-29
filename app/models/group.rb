class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :gmembers
  validates :name, presence: true
 end 
