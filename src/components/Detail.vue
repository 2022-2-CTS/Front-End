<template>
    <!-- 찜 기능 -->
    <div class="map-detail-heart-container">
      <img :src="require('@/img/heart_false.svg')" style="width: 36px; margin: 15px;" />
    </div>
    

    <!-- 행사 포스터 -->
    <div class="map-detail-poster">
      <img :src='viewData.imgSrc' style="width: 50%;" />
    </div>

    <!-- 행사 제목 -->
    <div class="map-detail-event-title">
      {{ viewData.title }}
    </div>

    <!-- 정보 container -->
    <div class="map-detail-info-container">
      <ul>
        <!-- 기간 -->
        <li>
          기간
          <div class="map-detail-info-content-of-content">
            {{ viewData.op_st_dt }} ~ {{ viewData.op_ed_dt }}
          </div>
        </li>

        <!-- 관람 회차 -->
        <li>
          관람 회차
          <div class="map-detail-info-content-of-content">
            {{ viewData.showtime }}
          </div>
        </li>

        <!-- 가격 -->
        <li>
          가격
          <div class="map-detail-info-content-of-content">
            {{ viewData.price }}
          </div>
        </li>
      </ul>
    </div>

  </template>
  
  <script>
  
  export default {
    name: 'Detail',
    data() {
        return {
          viewData : this.$route.query
        }
    },
    components: {
        
    },
    created() {
      console.log(JSON.stringify(this.$route.query));
    },
  }
  </script>
  
  <style>
  @import "../css/detail.css";
  </style>
  