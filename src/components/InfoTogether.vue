<template>
      <hr />
  <div class="info-display">
    <div v-for="(v, i) in togetherData" :key="i">
      <div class="info-card">
        <div style="margin-bottom:20px">
          {{ togetherData[i].title }}
          <div class="date-button">
            <span v-if="( togetherData[i].tag==0)">지금당장</span>
            <span v-if="( togetherData[i].tag==1)">어제 갔다왔음</span>
            <span v-if="( togetherData[i].tag==2)">오늘 하더라</span>
            <span v-if="( togetherData[i].tag==3)">내일도 한대</span>
          </div>
        </div>
        <div class="info-map" style="margin-bottom:20px">
          위치 지도
        </div>
        <div class="info-detail">
          {{ togetherData[i].content }}
        </div>
        <div class="toget-button">같이가요</div>
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
  name: 'InfoTogether',
  data() {
    return {
      togetherData: [],
      nowPage: 0,
    }
  },
  components: {
    BottomNav: BottomNav,
  },
  created() {
    axios.get("/api/together/").then((response) => { 
      console.log("together get");
      console.log(response.data);
      this.togetherData = response.data;
      console.log(this.togetherData[0].title);
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
  