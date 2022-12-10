<template>
      <!-- 뒤로가기 버튼 -->
      <div class="before-button" @click="this.$router.go(-1)">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-left"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
    </div>
    <!-- 찜 기능 -->
    <div class="map-detail-heart-container">
      <img v-if="heartClick == false" @click="heartClick = true"
      :src="require('@/img/heart_false.svg')" style="width: 36px; margin: 15px;" />

      <img v-if="heartClick == true" @click="heartClick = false"
      :src="require('@/img/heart_true.svg')" style="width: 36px; margin: 15px;" />
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
          viewData : this.$route.query,
          heartClick: false,
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
  