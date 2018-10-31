class EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]

  # GET /events
  def index
    @events = Event.where(nil) # creates an anonymous scope
    filtering_params(params).each do |key, value|
      @events = @events.public_send(key, value) if value.present?
    end
    @events = @events.paginate(:page => params[:page], :per_page => 10)
    render json: { data: @events, meta: {records: @events.count } }

  end

  # POST /events
  def create
    @event = Event.create!(event_params)
    json_response(@event, :created)
  end

  # GET /events/:id
  def show
    json_response(@event)
  end

  # PUT /events/:id
  def update
    @event.update(event_params)
    head :no_content
  end

  # DELETE /events/:id
  def destroy
    @event.destroy
    head :no_content
  end

  private

  def event_params
    # whitelist params
    params.permit(:title, :start_date, :end_date, :description, :category, :link, :web_source)
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def filtering_params(params)
    params.slice(:contains)
  end
end