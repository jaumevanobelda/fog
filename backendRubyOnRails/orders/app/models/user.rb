class User < ApplicationRecord
	has_many :libraries, dependent: :destroy
end