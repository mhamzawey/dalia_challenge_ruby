require 'rails_helper'

# Test suite for the Event model
RSpec.describe Event, type: :model do
  # Association test
  # Validation tests
  # ensure columns title, description, category, start_date, end_date, link, and web_source are present before saving
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:start_date) }
  it { should validate_presence_of(:end_date) }

end
