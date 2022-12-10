<template>
 <div class="info-display">

    <div v-for="(v, i) in postData" :key="i">
      <div class="info-card">
        <div class="info-top" style="margin-bottom:20px;">
          <span class="info-card-title" >
            {{ postData[i].title }}
          </span>
          <div class="date-button">

            <div v-if="postData[i].tag == 0">
              <span class="map-category-circle map-category-circle-red" style="float: left; margin-top: 8px; margin-left: 20px; margin-right: -12px;"> </span>
              <span>지금 당장</span>
            </div>

            <div v-if="postData[i].tag == 1">
              <div class="map-category-circle map-category-circle-blue" style="float: left; margin-top: 8px; margin-left: 8px; margin-right: -3px;"> </div>
              <span>어제 갔다왔음</span>
            </div>

            <div v-if="postData[i].tag == 2">
              <span class="map-category-circle map-category-circle-green" style="float: left; margin-top: 8px; margin-left: 12px; margin-right: -5px;"></span>
              <span>오늘 하더라</span>
            </div>

            <div v-if="postData[i].tag == 3">
              <span class="map-category-circle map-category-circle-yellow" style="float: left; margin-top: 8px; margin-left: 15px; margin-right: -3px;"></span>
              <span>내일도 한대</span>
            </div>

          </div>
        </div>
        <div class="info-map" style="margin-bottom:20px;">
          <img :src="require(`@/img/infoDummy/infoDummy${i + 1}.png`)" style="width: 90vw;"/>
        </div>
        <div class="info-detail">
          {{ postData[i].content }}
        </div>
      </div>
      <hr />
    </div>

    
    <br/>
    <br/>
    <br/>
    <br/>
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
      // info share dummy data
      infoDummy: [
        '@/img/infoDummy/infoDummy1.png',
        '@/img/infoDummy/infoDummy2.png',
        '@/img/infoDummy/infoDummy3.png',
        '@/img/infoDummy/infoDummy4.png',
      ]
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
@import '../css/map.css';
</style>
  
  