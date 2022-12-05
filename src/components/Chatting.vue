<template>
    <div class="chat-title">
            채팅
    </div>
    <hr />
    <div class="container p-4 detail">

  <div class="row">
    <div class="col-3">
      <ul class="list-group chat-list">
        <li class="list-group-item" v-for="list in state.chatList" :key="list.title" @click="click_title(list.title)">
          <h6>{{list.title}}</h6>
          <h6 class="text-small">{{list.title}}님과의 채팅입니다.</h6>
        </li>
       </ul>
     </div>

     <div class="col-9 p-0">
       <div class="chat-room" style="background:#2F3F67">
          <ul class="list-group chat-content">
            <div v-for="List in state.chattingList" :key="List">
                <li v-if="List.userid === state.you_id"><span class="chat-box">{{List.content}}</span></li>
                <li v-if="List.userid === state.my_id"><span class="chat-box mine">{{List.content}}</span></li>
            </div>
          </ul>
        <div class="input-group">
          <input class="form-control" id="chat-input" v-model="value" @input="state.content = $event.target.value" />
          <button class="btn btn-secondary" id="send" @click="send()">전송</button>
        </div>
      </div>
    </div>
  </div>
</div> 
    
</template>

<script>
import {reactive} from "vue"; 
import axios from "axios";

export default {
    setup() {
        const state=reactive({
            chatList:[{}],
            my_id:'cts',
            you_id:'',
            content:"",
            title:"",
            myChat:{},
            youChat:{},
            chattingList:[{}],
        });
        
        const args={
           my_id : state.my_id,
        };
        axios.post('/api/chat', args).then((res) =>{
            console.log(res.data);
            for(var i=0; i<res.data.length; i++){
                console.log(res.data[i]);
                if(res.data[i].mid == state.my_id){
                    state.chatList[i] = res.data[i];
                    console.log(state.chatList[i]);
                }
            }
        });

        var eventsource;

        const click_title = (title) => {
            state.title = title;

            if(eventsource != undefined){
                eventsource.close();
            }

            eventsource = new EventSource('/api/message/' + title);
            eventsource.addEventListener('test', function(e){
                e.data;
                console.log(JSON.parse(e.data));
                var list = JSON.parse(e.data);
                state.chattingList = list;
                console.log(list.length);
                for(var i=0; i<list.length; i++){
                    console.log(state.my_id);
                    console.log(list[i].userid);
                    if(list[i].userid == state.my_id){
                        console.log(list[i].content);
                        state.myChat[i] = list[i];
                    }
                    if(list[i].userid == state.you_id){
                        console.log(list[i].content);
                        state.youChat[i] = list[i];
                    }
                }
            });
        };

        const send = () => {
            console.log("메세지 전송")
            const chatData={
                parent : state.title,
                content : state.content,
                userid : state.my_id,
            }
            axios.post("api/message", chatData).then(()=>{
                console.log("전송성공");
            })

        };

        
        
        return {state, send, click_title};
    },
}
</script>

<style>
.chat-title{
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
  background: #eee;
  padding: 5px;
  border-radius: 5px;
  float: left;
}
.mine {
  float: right;
  background: yellow;
} 
</style>