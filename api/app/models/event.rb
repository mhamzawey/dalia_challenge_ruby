class Event < ApplicationRecord
  validates_presence_of :title, :start_date, :end_date
  validates :link, uniqueness: true
  scope :contains, -> (query) do  where("title LIKE :query", query: "%#{query}%")
  end
end
