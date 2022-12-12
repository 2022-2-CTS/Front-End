<template>
    <!-- 정보 작성 -->
    <div class="post-title">
      같이GOGO 작성
      <hr />
    </div>
    <div class="post-display">
    <!-- 행사 제목 -->
    <div class="post-input-label">행사제목</div>
    <Input class="post-input-title" @input="inputData.title = $event.target.value"></Input>
    <!-- 위치 추가 -->
      <!-- 위치 -->
      <div class="post-input-label">위치</div>
      <!-- 위치 선택 아이콘 -->
      <div>
        <Input class="map-input"></Input>
        <div class="post-map-icon">
          <img :src="require('@/img/now_position_icon.svg')"
            style="width: 38px; height: 38px; padding-top: 5px;margin-top: 3px;" />
        </div>
      </div>

    <!-- 태그 선택 -->
    <div style="margin: auto;margin-top:30px;margin-left: 6%;margin-right: 3%;">
      <div class="date-select-button" @click="inputData.tag = 0">
        지금당장
      </div>
      <div class="date-select-button" @click="inputData.tag = 1">
        어제 갔다왔음
      </div>
      <div class="date-select-button" @click="inputData.tag = 2">
        오늘 하더라
      </div>
      <div class="date-select-button" @click="inputData.tag = 3">
        내일도 한대
      </div>
    </div>


    <div class="post-label">내용</div>
    <Input class="post-input-box" @input="inputData.content = $event.target.value"></Input>


    <div class="post-btn" style="margin:auto" @click="writeEnd">
      <button class="final-button" @click="goSignUp">작성 완료</button>
    </div>
    </div>
  </template>
    
  <script>
  import axios from 'axios';
  
  export default {
    name: 'InfoPost',
    data() {
      return {
        inputData: {
          userId: localStorage.getItem('my_id'), 
          title: "",
          tag: null,
          content: ""
        }
      }
    },
    components: {
  
    },
    methods: {
      writeEnd() {
        console.log(this.inputData)
        axios.post('/api/together/upload', this.inputData).then(() => {
          console.log("post push");
        }).catch(err => {
          alert(err);
          console.log(err);
        });
      },
    }
  }
  </script>
    
  <style>
  @import '../css/Info.css';
  </style>
    