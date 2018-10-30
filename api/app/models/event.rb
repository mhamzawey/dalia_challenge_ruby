class Event < ApplicationRecord
  validates_presence_of :title, :start_date, :end_date
  validates :link, uniqueness: true
  scope :starts_with, -> (query) do  where("title like ?", "#{query}%")
  end
end
