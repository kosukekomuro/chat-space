json.content @comment.content
json.image @comment.image
json.created_at @comment.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @comment.user.name
# idもデータとして渡す
json.id @comment.id
