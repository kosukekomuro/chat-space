class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.string :content, null:false
      t.string :image
      t.references :group, foreign_key: true, null:false
      t.references :user, foreign_key: true, null:false
      t.timestamps
      t.timestamps
    end
  end
end
