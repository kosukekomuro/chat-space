$(document).on('turbolinks:load', function(){

  // アロー関数による定義
  const buildContentHTML = content =>{
    let html = `<div class = 'content' data-comment-id = '${content.id}'>
                    <div class = 'content-info'>
                      <p class = 'cotent-info__user'>
                        ${content.user_name}
                      </p>
                      <p class = 'content-info__date-time'>
                        ${content.created_at}
                      </p> 
                    </div>`

    // 加えるhtmlを条件分岐
    //テキストが存在する場合
    if (content.content !== ''){
      html += `<div class = 'content__text'>
                  ${content.content}
              </div>`
    };

    //画像が存在する場合
    if (content.image.url !== null){
      html += `<img src = ${content.image.url}>
              </img>`
    };
    $('.chat-area').append(html);
  };

  // formの送信イベント
  $('#new-content').on('submit', function(e){
    // デフォルトの送信を止める
    e.preventDefault();

    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    //jsonデータの受け取りに成功した場合
    .done(function(data){
      //contentのhtmlを追加
      buildContentHTML(data);

      //一番下までスクロールする
      $('.chat-area').animate({scrollTop: $('.chat-area')[0].scrollHeight}, 'fast');

      //reset():フォーム部品の値を初期設定値に戻す
      $('#new-content')[0].reset();
    })
    //jsonデータの受け取りに失敗した場合
    .fail(function(){
      alert('メッセージの送信に失敗しました')
    })
    // disabled(ボタンが使えなくなる)属性を削除
    .always(function(data){
      $('.new-content__submit-btn').prop('disabled', false);
    })
  })

  //更新処理
  const reloadMessages = () => {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_comment_id = $(".content:last").attr('data-comment-id')
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: 'api/comments',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_comment_id}
    })
    .done(function(comments) {
      if(comments.length !==0){
        comments.forEach(function(comment){
          buildContentHTML(comment);
        });
        //一番下までスクロールする
        $('.chat-area').animate({scrollTop: $('.chat-area')[0].scrollHeight}, 'fast');
      };
    })
    .fail(function() {

      alert('自動更新に失敗しました');
    });
  };
  //5秒ごとにcontentを更新
  setInterval(reloadMessages, 5000);
})
