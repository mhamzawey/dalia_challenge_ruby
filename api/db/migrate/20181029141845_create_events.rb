class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.string :category
      t.date :start_date
      t.date :end_date
      t.string :link
      t.string :web_source

      t.timestamps
    end
  end
end
