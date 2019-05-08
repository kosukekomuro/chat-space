//遷移直後でもJQueryが反映されるように
//document).on('turbolinks:load' を追加
$(document).on('turbolinks:load', function(){

  const search_list = $("#user-search-result");
  

  //検索したユーザーのDOM作成
  const appendSeachUser = user => {
    const html = `<div class='chat-group-user clearfix'>
                    <p class='chat-group-user__name'>${user.name}</p>
                    <a class = "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`
    //DOMオブジェクトに追加
    search_list.append(html);
  }

  //検索に一致しなった場合のDOM
  const appendErrMsgToHTML = msg => {
    const html = `<div class='chat-group-user clearfix'>
                    <p class='chat-group-user__name'>一致するユーザーが見つかりません</p>
                  </div>`
    search_list.append(html);
  }

  //現在のグループメンバーを表示するDOMの作成
  const appendGroupMember = (id, name) => {

    const group_member_list = $("#chat-group-users");

    const html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`

    group_member_list.append(html);
  }


  //キーを入力するごと発火
  $("#user-search-field").on("keyup", function(){
    //ユーザーの入力を取得
    let input = $("#user-search-field").val();

    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      console.log(users)
      //検索結果の初期化
      $("#user-search-result").empty();
      if(users.length !==0){
        users.forEach(function(user){
          appendSeachUser(user)
        });
      }else //{}の省略
        appendErrMsgToHTML("一致するユーザーが見つかりません");
    })
    .fail(function(){
      alert('ユーザーの検索に失敗しました')
    })
  })

  //動的に追加されたHTML要素のイベントを取得する方法
  //$(document)とonメソッドを使用し、第二引数にセレクタを入れる
  $(document).on("click", ".chat-group-user__btn--add", function(){

    let id = $(this).attr("data-user-id");
    let name = $(this).attr("data-user-name");

    appendGroupMember(id, name);

    console.log(this);
    //イベントが発火した要素とその親要素を削除
    $(this).parent().remove();
  })

  //追加したユーザーを削除する
  $(document).on("click", ".js-remove-btn", function(){
    $(this).parent().remove();
  })
})
