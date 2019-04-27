# README

## DB設計
 ---
### users table
 ---
 Column | Type | Options
  --- | --- | --- |
  id | INT | PRIMARY KEY |
  name | VARCHER | null: false, unique: true, index: true  |
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
  name | VARCHER | null: false

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
  references :user | INT | foreign_key: true, null: false |
  references :group | INT | foreign_key: true , null: false|
  #### Association
  - belongs_to :user
  - belongs_to :group

   ---
### comments table
 ---
 Column | Type | Options
  --- | --- | --- |
  id | INT | PRIMARY KEY |
  content | VARCHER |null: false |
  image | VARCHER | |
  references :user | INT | foreign_key: true, null: false |
  references :group | INT | foreign_key: true , null: false|
  #### Association
  - belongs_to :user
  - belongs_to :group
