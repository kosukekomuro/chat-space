class Api::MessagesController < ApplicationController
  def index
    @comments = @group.comments.where("id > ?", 'id')
  end
end
