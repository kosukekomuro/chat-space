# README

## DB設計
 ---
### users table
 ---
 Column | Type | Options
  --- | --- | --- |
  id | INT | PRIMARY KEY |
  name | VARCHER | null: false |
  email | VARCHER | null: false, uniqle: true |
  password | VARCHER | null: false |

  #### Association
  - has_many :members
  - has_many :groups, through: :members
  - has_many :comments

 ---
### groups table
 ---
 Column | Type | Options
  --- | --- | --- |
  id | INT | PRIMARY KEY |
  group_name | VARCHER | null: false

  #### Association
  - has_many :members
  - has_many :users, through: :members
  - has_many :comments

 ---
### members table
 ---
 Column | Type | Options
  --- | --- | --- |
  id | INT | PRIMARY KEY |
  user_id | INT | FOREIGN KEY |
  group_id | INT | FOREIGN KEY |
  #### Association
  - belongs_to :user
  - belongs_to :group

   ---
### comments table
 ---
 Column | Type | Options
  --- | --- | --- |
  id | INT | PRIMARY KEY |
  comment | VARCHER |null: false |
  user_id | INT | FOREIGN KEY |
  group_id | INT | FOREIGN KEY |
  #### Association
  - belongs_to :user
  - belongs_to :group
