$(function(){

  // formの送信イベント
  $('.new-content').on('submit', function(e){
    // デフォルトの送信を止める
    e.preventDefault();

    let formData = new FormData(this);
    let url =$(this).attr('action');

    console.log(this);
  })
})
