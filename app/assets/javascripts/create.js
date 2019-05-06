$(function(){

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

    if (content.content !== ''){
      html += `<div class = 'content__text'>
                  ${content.content}
              </div>`
    }

    if (content.image.url !== null){
      html += `<img src = ${content.image.url}>
              </img>`
    }
    return html
  }

  // // textの追加
  // const addText = text =>{
  //   const contentText = `<div class = 'content__text'>
  //                           ${text}
  //                       </div>`
  //   return contentText
  // }

  // //imageの追加
  // const addImage = image =>{
  //   const contentImage = `<div class = 'lower-message__image'>
  //                           ${image}
  //                       </div>`
  //   return contentImage
  // }

  // formの送信イベント
  $('#new-content').on('submit', function(e){
    // デフォルトの送信を止める
    e.preventDefault();

    console.log(this);
    var formData = new FormData(this);
    let url = $(this).attr('action');

    console.log(formData);

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
      console.log(data);
      const html = buildHTML(data);
      $('.chat-area').append(html);

      //一番下までスクロールする
      $('.chat-area').animate({scrollTop: $('.chat-area')[0].scrollHeight}, 'fast');

      //inputboxのメッセージの削除
      $('#comment_content').val('');
      
    })
    ////jsonデータの受け取りに失敗した場合
    .fail(function(){
      alert('メッセージの送信に失敗しました')
    })
    // disabled(ボタンが使えなくなる)属性を削除
    .always(function(data){
      $('.new-content__submit-btn').prop('disabled', false);　//ここで解除している
    })
  })
})
