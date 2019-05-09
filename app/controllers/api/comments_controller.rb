class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.where("id > ? AND group_id Like(?)", "#{params[:id]}", "#{params[:group_id]}")
  end
end
