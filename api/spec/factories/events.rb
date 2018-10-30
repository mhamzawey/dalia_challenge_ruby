FactoryBot.define do
  factory :event do
    title { "MyString" }
    description { "MyString" }
    category { "MyString" }
    start_date { "2018-10-29" }
    end_date { "2018-10-29" }
    web_source { "MyString" }
    sequence(:link) { |n| "event#{n}" }
  end
end
