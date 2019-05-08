json.(@comment, :content, :image)
json.created_at @comment.created_at.format_posted_time(@message.created_at)
# strftime("%Y/%m/%d %H:%M")
json.username @comment.user.name
# idもデータとして渡す
json.id @content.id
