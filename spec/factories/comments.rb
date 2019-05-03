FactoryBot.define do
  factory :comment do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/no_image.png")}
    user
    group
  end
end
