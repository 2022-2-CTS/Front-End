<template>
    <!-- 정보 작성 -->
    <div class="post-title">
      같이GOGO 작성
      <hr />
    </div>
    
    <div class="post-display">
      <!-- 행사 제목 -->
      <div>
        행사제목
        <Input class="post-input" @input="inputData.title = $event.target.value"></Input>
      </div>
  
      <!-- 위치 추가 -->
      <div>
        <!-- 위치 -->
        <div class="post-label">
          위치
        </div>
  
        <!-- 위치 선택 아이콘 -->
        <div>
          <Input class="map-input"></Input>
          <div class="post-map-icon">
            <img :src="require('@/img/now_position_icon.svg')" style="width: 38px; height: 38px; padding-top: 5px;" />
          </div>
        </div>
      </div>
  
      <!-- 태그 선택 -->
      <div class="post-btn-group">
        <div class="date-select-button" @click="inputData.tag = 0">지금당장</div>
        <div class="date-select-button" @click="inputData.tag = 1">어제 갔다왔음</div>
        <div class="date-select-button" @click="inputData.tag = 2">오늘 하더라</div>
        <div class="date-select-button" @click="inputData.tag = 3">내일도 한대</div>
      </div>
  
      <!-- 내용 -->
      <div style="margin-top: 10%;">
        <label class="post-label">내용</label>
        <!-- real 내용 -->
        <Input class="post-input-box" @input="inputData.content = $event.target.value"></Input>
      </div>
  
      <!-- 작성 완료 -->
      <div class="final-btn" style="margin:auto" @click="writeEnd">
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
    