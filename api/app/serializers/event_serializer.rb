class EventSerializer < ActiveModel::Serializer
  attributes :id, :title ,:description, :category, :link, :start_date, :end_date, :web_source
end
