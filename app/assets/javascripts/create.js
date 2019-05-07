$(document).on('turbolinks:load', function(){

  // アロー関数による定義
  const buildHTML = content =>{
    let html = `<div class = 'content' >
                    <div class = 'content-info'>
                      <p class = 'cotent-info__user'>
                        ${content.username}
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
    }

    //画像が存在する場合
    if (content.image.url !== null){
      html += `<img src = ${content.image.url}>
              </img>`
    }
    return html
  }

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
      const html = buildHTML(data);
      $('.chat-area').append(html);

      //一番下までスクロールする
      $('.chat-area').animate({scrollTop: $('.chat-area')[0].scrollHeight}, 'fast');

      //inputboxのメッセージの削除
      $('#comment_content').val('');

      //imageのsrc属性削除
      $('#comment_image').val('');
    })
    ////jsonデータの受け取りに失敗した場合
    .fail(function(){
      alert('メッセージの送信に失敗しました')
    })
    // disabled(ボタンが使えなくなる)属性を削除
    .always(function(data){
      $('.new-content__submit-btn').prop('disabled', false);
    })
  })
})
