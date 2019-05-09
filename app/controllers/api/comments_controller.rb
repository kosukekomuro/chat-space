class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.where("id > ?", "#{params[:id]}")
  end
end
