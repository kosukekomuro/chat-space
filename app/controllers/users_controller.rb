class UsersController < ApplicationController

  def index
    # 検索フォームのキーワードであいまい検索を行い、usersテーブルからユーザー情報を取得する
    @users = User.where('name LIKE(?)', "#{params[:keyword]}%")

    # binding.pry

    respond_to do |format|
      format.html { redirect_to new_group_path}
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
