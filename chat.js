/* センサ値 -> MTのAIで処理 -> 自然言語を生成？ */

// ルールベース
// 湿度XX%以下、気温YY℃以上
const message0 = "ぼく、かびそうだよ...";
// 湿度ZZ％以上
const message1 = "今日は雨降るから持っていってyo";
// GPS変化なしAA日以上
const message2 = "たんすの肥やしなう"

const message3 = "・・・。"

const messages = [message0, message1, message2, message3];

  $(function () {
    var socket = io();

    setInterval(function(){
        let rand = Math.floor(Math.random() * 3) + 0
        socket.emit('chat message', messages[rand]);
    }, 5000)

    socket.on('chat message', function(msg, a){
        console.log(a);
        let img_src;
        let flag = false;
        if(msg == messages[0]){
            img_src =　"/img/bag.jpg";
        } else if(msg == messages[1]){
            img_src = "/img/kasa.png";
        } else if(msg == messages[2]){
            img_src = "/img/huku1.png";
        } else if(msg == messages[3]){
            img_src = "/img/huku2.png";
        } else {
            img_src = "/img/me.png";
            flag = true;
        }

        if(flag){
            $('#messages').append($('<span>').html('<div class="mycomment"><p>' + msg + '</p></div>'));
        } else {
            $('#messages').append($('<span>').html('<div class="balloon6"><div class="faceicon"><img src="'+ img_src +'" /></div><div class="chatting"><div class="says"><p>' + msg + '</p></div></div></div>'));
        }

        window.scrollTo(0, document.body.scrollHeight);
    });

    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
  });
