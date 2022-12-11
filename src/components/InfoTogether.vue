<template>
  <div class="info-display">
    <div v-for="(v, i) in togetherData" :key="i">
      <div class="info-card">
        <div style="margin-bottom:20px">
          <span class="info-card-title">
          {{ togetherData[i].title }}
        </span>
          <div class="date-button">
            <div v-if="togetherData[i].tag == 0">
              <span class="map-category-circle map-category-circle-red" style="float: left; margin-top: 8px; margin-left: 20px; margin-right: -12px;"> </span>
              <span>지금 당장</span>
            </div>

            <div v-if="togetherData[i].tag == 1">
              <div class="map-category-circle map-category-circle-blue" style="float: left; margin-top: 8px; margin-left: 8px; margin-right: -3px;"> </div>
              <span>어제 갔다왔음</span>
            </div>

            <div v-if="togetherData[i].tag == 2">
              <span class="map-category-circle map-category-circle-green" style="float: left; margin-top: 8px; margin-left: 12px; margin-right: -5px;"></span>
              <span>오늘 하더라</span>
            </div>

            <div v-if="togetherData[i].tag == 3">
              <span class="map-category-circle map-category-circle-yellow" style="float: left; margin-top: 8px; margin-left: 15px; margin-right: -3px;"></span>
              <span>내일도 한대</span>
            </div>
          </div>
        </div>
        <div class="info-map" style="margin-bottom:20px">
          위치 지도
        </div>
        <div class="info-detail">
          {{ togetherData[i].content }}
        </div>
        <div class="toget-button" @click="MakeChat(); args.yid = togetherData[i].userId">같이가요</div>
      </div>
      <hr />
    </div>
  </div>

  <br/>
  <br/>
  <br/>
  <br/>
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
      args:{
        yid:"",
        mid:localStorage.getItem('my_id'),
      }
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
  },
  methods:{
    MakeChat(){
      axios.post("/api/makechat", this.args).then((res) => {
        console.log(res.data);
      })
    }
  }
}
</script>
  
<style>
@import '../css/Info.css';
</style>
  