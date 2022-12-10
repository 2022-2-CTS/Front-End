<template>
<div>
  <div class="chat-title">채팅
    <button class="info-map-icon" style="width:30px; height:30px" @click="this.$router.go()"></button>
  </div>
  <hr />
  <div class="container p-4 detail">
    <div class="row">
      <div class="col-3">
        <ul>
          <li
            class="list-group-item"
            v-for="list in state.chatList"
            :key="list.title"
            @click="click_title(list._id, list.yid)"
          >
            <div v-if="state.my_id == list.yid" class="chat-list">
              <h6>{{ list.mid }}</h6>
            </div>
            <div v-if="state.my_id == list.mid" class="chat-list">
              <h6>{{ list.yid }}</h6>
            </div>
          </li>
        </ul>
      </div>

      <div class="col-9 p-0">
        <div class="chat-room" style="background: #2f3f67; border-radius: 20px">
          <ul class="list-group chat-content">
            <div v-for="List in state.chattingList" :key="List">
              
                <div class="chat-box">
                  <h4>{{List.userid}}</h4> 
                  {{ List.content }}
                </div>
              
            </div>
            <div id="content">
            </div>
          </ul>
          <div class="input-group" style="background: rgba( 255, 255, 255, 0 );">
            <input
              class="form-control"
              id="chat-input"
              v-model="value"
              @input="state.content = $event.target.value"
              style="border:3px solid rgba( 255, 255, 255, 0 ); border-radius: 0px 0px 0px 20px; padding:10px"
            />
            <button class="btn btn-secondary" id="send" @click="send()" style="border:0px; background:rgba( 255, 255, 255, 0 )">
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import io from "socket.io-client";
import $ from 'jquery';

export default {
  setup() {
    const state = reactive({
      chatList: [{}],
      my_id: localStorage.getItem('my_id'),
      you_id: "",
      content: "",
      title: "",
      myChat: {},
      youChat: {},
      chattingList: [{}],
      isConnected:false,
      instance : 0,
    });

    const realTime = [{}];

    const reload = () => {
      this.$router.go(this.$router.currentRoute)
    }

    const chatIO = io("localhost:3000", {
      origins: "*:*",
    });

    const args = {
      my_id: state.my_id,
    };
    axios.post("/api/chat", args).then((res) => {
      console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        console.log(res.data[i]);
        if (res.data[i].mid == state.my_id || res.data[i].yid == state.my_id) {
          state.chatList[i] = res.data[i];
          console.log(state.chatList[i]);
        }
      }
    });

    var eventsource;

    const click_title = (title, yid) => {
      state.title = title;
      state.you_id = yid;
      console.log(state.you_id);
      const args ={
        title_ : title,
      }
      axios.post('/api/chatroom', args).then((res) =>{
        console.log(res);
      })

      chatIO.emit(title);

      console.log('title이에용' + title);

      if (eventsource != undefined) {
        eventsource.close();
      }

      eventsource = new EventSource("/api/message/" + title);
      eventsource.addEventListener("test", function (e) {
        e.data;
        console.log(JSON.parse(e.data));
        var list = JSON.parse(e.data);
        state.chattingList = list;
        console.log(list.length);
        for (var i = 0; i < list.length; i++) {
          console.log(state.my_id);
          console.log('userid = ' + list[i].userid);
          if (list[i].userid == state.my_id) {
            console.log(list[i].content);
            state.myChat[i] = list[i];
          }
          if (list[i].userid == state.you_id) {
            console.log(list[i].content);
            state.youChat[i] = list[i];
          }
        }
      });
    };


    chatIO.on("connection", function () {
      state.isConnected = true;
    });

     chatIO.on("disconnect", function () {
      state.isConnected = false;
      console.log("접속이 종료되었습니다.");
    });

    const send = () => {
      console.log("메세지 전송");
      console.log(state.content);
      const chatData = {
        parent: state.title,
        content: state.content,
        userid: state.my_id,
      };
      if(state.isConnected == true){
        console.log("HELLO!!");
        console.log(state.title);
        chatIO.emit(state.title, chatData);
        console.log(chatData);
      }
      axios.post("api/message", chatData).then(() => {
        console.log("전송성공");
      });
      console.log(realTime);
    };

    chatIO.on("broadcast message", function (msg) {
      console.log("message: " + msg);
      realTime.push(msg);
      $('#content').append('<div class="chat-box">'+ msg.userid + '    ' + msg.content + '<div>');
    });

    return { state, send, click_title, realTime, reload};
  },
};
</script>

<style>

.chat-list{
  background: rgb(227, 112, 57);
  border-radius: 15px;
  padding:10px;
  padding-top:17px;
  margin-bottom:5px;
  color:white;
  text-align: center;
  justify-content: center;
}

.chat-title {
  height: 3rem;
  text-align: center;
  font-size: 25px;
  padding: auto;
  margin-top: 1rem;
  margin-left: 3rem;
}
.chat-content {
  height: 450px;
  overflow-y: scroll;
  padding: 10px;
}
.chat-content li {
  margin-top: 10px;
  list-style: none;
}
.text-small {
  font-size: 12px;
  color: gray;
  margin-bottom: 0;
}
.chat-box {
  background: white;
  padding-bottom: 20px;
  border-radius: 20px;
  padding-left: 20px;
  padding-top:13px;
  margin-left: 15px;
  margin-right: 6px;
  margin-top:20px;
  color:black;
  border:3px solid #2f3f67;
}
.mine {
  float: right;
  background: yellow;
}
</style>