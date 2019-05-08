//遷移直後でもJQueryが反映されるように
//document).on('turbolinks:load' を追加
$(document).on('turbolinks:load', function(){

  const search_list = $("#user-search-result");

  const appendUser = user => {
    const html = `<div class='chat-group-user clearfix'>
                    <p class='chat-group-user__name'>${user.name}</p>
                    <a class = "user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`
    //DOMオブジェクトに追加
    search_list.append(html);
  }

  const apprndErrMsgToHTML = msg => {
    const html = `<div class='chat-group-user clearfix'>
                    <p class='chat-group-user__name'>一致するユーザーが見つかりません</p>
                  </div>`
    search_list.append(html);
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
      // processData: false,
      // contentType: false
    })
    .done(function(users){
      console.log(users)
      //検索結果の初期化
      $("#user-search-result").empty();
      if(users.length !==0){
        users.forEach(function(user){
          appendUser(user)
        });
      }else //{}の省略
        apprndErrMsgToHTML("一致するユーザーが見つかりません");
    })
    .fail(function(){
      alert('ユーザーの検索に失敗しました')
    })
  })
})
