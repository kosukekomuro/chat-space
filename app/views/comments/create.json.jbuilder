json.username @comment.user.name
json.created_at @comment.created_at.strftime("%Y/%m/%d %H:%M")
json.content @comment.content
json.image @comment.image
json.group_id @comment.group_id
