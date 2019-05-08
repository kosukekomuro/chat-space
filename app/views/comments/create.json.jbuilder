json.(@comment, :content, :image)
json.created_at @comment.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @comment.user.name
# idもデータとして渡す
json.id @comment.id
