json.array! @comments do |comment|
  json.content comment.content
  json.image comment.image
  json.created_at format_posted_time(comment.created_at)
  json.user_name comment.user.name
  json.id comment.id
end
