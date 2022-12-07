<template>
 <div class="info-display">
    <hr />
    <div v-for="(v, i) in postData" :key="i">
      <div class="info-card">
        <div style="margin-bottom:20px">
          {{ postData[i].title }}
          <div class="date-button">
            <div class="catered"/>
            <span v-if="( postData[i].tag==0)">지금당장</span>
            <spna v-if="( postData[i].tag==1)" style="display: inline-block" >어제 갔다왔음</spna>
            <spna v-if="( postData[i].tag==2)">오늘 하더라</spna>
            <spna v-if="( postData[i].tag==3)">내일도 한대</spna>
          </div>
        </div>
        <div class="info-map" style="margin-bottom:20px">
          위치 지도
        </div>
        <div class="info-detail">
          {{ postData[i].content }}
        </div>
      </div>
      <hr />
    </div>
  </div>
  <BottomNav :nowPage="nowPage"/>
</template>
  
<script>
import BottomNav from "./BottomNav.vue";
import axios from 'axios';

export default {
  name: 'InfoShare',
  data() {
    return {
      // ex : [ 1,2,3],
      postData: [],
      // 현재 페이지 : info (0)
      nowPage: 0,
    }
  },
  components: {
    BottomNav: BottomNav,
  },
  created() {
    axios.get("/api/board/").then((response) => { 
      console.log("post get");
      console.log(response.data);
      this.postData = response.data;
      console.log(this.postData[0].title);
    }).catch(err => {
      alert(err);
      console.log(err);
    });
  }
}
</script>
  
<style>
@import '../css/Info.css';
</style>
  
  