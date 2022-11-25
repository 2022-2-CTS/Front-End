<template>
 <div class="info-display">
    <hr />
    <div v-for="(v, i) in postData" :key="i">
      <div class="info-card">
        <div style="margin-bottom:20px">
          {{ postData[i].title }}
          <div class="date-button">
            {{ postData[i].tag }}
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
    axios.get("/api/post-get").then((response) => { 
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
  
  