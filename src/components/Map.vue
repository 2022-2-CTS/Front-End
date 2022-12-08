<template>
  <BottomNav :nowPage="nowPage"></BottomNav>

  <div id="map">
    <div class="map-category">
      <ul class="map-list-style-ul">
        <li v-for="i in cultureData" :key="i" class="map-list-style-li">
          <div class="map-category-flex">
            <div class="map-category-circle map-category-item" :class="{
              'map-category-circle-red': i.color == 'red',
              'map-category-circle-blue': i.color == 'blue',
              'map-category-circle-green': i.color == 'green',
              'map-category-circle-yellow': i.color == 'yellow'
            }">
            </div>
            <div class="map-category-item">
              {{ i.name }}
            </div>
          </div>
        </li>
        <span>
          <button
            style="border:1px solid lightgray; border-radius:20px; background:white; padding-bottom:4px; color:black; font-weight:300; font-size:1em; "
            @click="this.$router.push('/chat')">
            chat
            <!-- <div :src="require('@/img/ChatIcon.svg')" style="width: 10px;" /> -->
          </button>

        </span>

      </ul>
    </div>


    <div v-if="testModal == true" class="map-marker-click-modal">
      <div class="map-marker-click-modal-list-container container text-center">
        <div v-for="i in 10" :key="i" class="row">
          <!-- 사진 -->
          <div class="map-marker-click-modal-list-pic col-4">

          </div>

          <!-- 사진 옆에 내용 -->
          <div class="map-marker-click-modal-list-main col-6">
            <!-- 카테고리 -->
            <div class="map-marker-click-modal-list-main-category">

            </div>
            <!-- 제목, 일시 -->
            <div class="map-marker-click-modal-list-main-content">
              <div>
                <h1>어쩌구저쩌구제목입니다</h1>
              </div>
              <div>
                <h4>일시</h4>
              </div>
            </div>
          </div>

        </div>

        <button @click="request">
          이걸 눌러봐!
        </button>

        <div>
          {{ responseData }}
        </div>

      </div>
    </div>

  </div>
</template>
  
<script>
import BottomNav from "./BottomNav.vue";
import axios from 'axios';
// import { CIcon } from '@coreui/icons-vue';
// import * as icon from '@coreui/icons';

export default {
  name: 'Map',
  data() {
    return {
      // 문화 데이터 4개
      cultureData: [
        {
          name: "뮤지컬",
          color: 'red'
        },
        {
          name: "연극",
          color: 'blue'
        },
        {
          name: "공연·전시",
          color: 'green'
        },
        {
          name: "콘서트",
          color: 'yellow'
        },
      ],
      // 모달창 오픈 여부
      testModal: false,
      responseData: "",
      // 현재 페이지 : map (1)
      nowPage: 1,

      // 행사 데이터 4종류
      playData: [],
      concertData: [],
      musicalData: [],
      exhibitData: [],
    }
  },
  components: {
    BottomNav: BottomNav,
  },
  mounted : async function() {
    // window 객체에 kakao가 등록되어있는지 확인하고, 없을 때만 로딩
    if (!window.kakao || !window.kakao.maps) {
      // script 태그 객체 생성
      const script = document.createElement("script");
      // src 속성을 추가하며 .env.local에 등록한 service 키 활용
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=	403841fc6ce405f4d15772e3fb808956&libraries=services';

      // javascript를 통해서 script를 로딩 시켰으므로, 로딩 완료에 대한 감지도 역시 javascript를 통해서 이뤄져야 함
      // 로딩 완료 시점을 파악하기 위해 load 이벤트 사용
      // 동적 로딩을 위해서 autoload=false 추가

      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      // document의 head에 script 추가
      document.head.appendChild(script);
    }
    else {
      console.log("이미 로딩됨 : ", window.kakao);
      // 앗 큰일이다... 로딩 화면을 만들어야하나?
      await this.request();
      await this.initMap();
    }
  },
  created() {
    this.request();
  },
  methods: {
    // 맵 생성
    initMap : async function() {
      this.request();
      // 맵 생성
      if (this.map == null) {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(35.168923, 129.134230, 16),
          level: 4,
        };

        this.map = new kakao.maps.Map(container, options);
      }

      var testMarkerPosition = new kakao.maps.LatLng(35.169020, 129.134772);

      var testMarker = new kakao.maps.Marker({
        position: testMarkerPosition,
        clickable: true,
      });

      testMarker.setMap(this.map);

      kakao.maps.event.addListener(testMarker, 'click', () => {
        if (!this.testModal) {
          this.testModal = true;
        }
        else {
          this.testModal = false;
        }

      });

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();
      //var nowLocation;

      //console.log(this.playData);
      console.log(Object.keys(this.playData).length);

      var positionLength = Object.keys(this.playData).length;
      var callMap = this.map; // 콜백함수 내에서 쓸 map 복사본(?)

      // 주소로 좌표를 검색
      for (var i = 0; i < positionLength; i++) {
        var locationLength = Object.keys(this.playData[i]).length;
        //console.log(locationLength);
        //console.log(i + " : " + JSON.stringify(this.playData[i]));
        var positionData = this.playData[i];
        for (var j = 0; j < locationLength - 1; j++) {
          var locationData = positionData[i][j].data.location;
          //console.log(j + " : " + JSON.stringify(locationData));
          geocoder.addressSearch(locationData, (result, status) => {
            
            var coords;
            var map = callMap;
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
              //console.log(result);
              coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              //console.log(coords);
              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords
              });

              marker.setMap(map);
            }
          });
        }
      }



      console.log("맵을 불러왔어!");
    },
    request : async function() {
      // axios.get('/api/testtData').then((response) => {
      //   this.responseData = response.data;
      //   console.log("데이터를 받아왔어!");
      // }).catch(err => {
      //   alert(err);
      //   console.log(err);
      // });
      await axios.get('/api/data/play').then((res) => {
        this.playData = res.data;
        //console.log(this.playData);
      })
      await axios.get('/api/data/concert').then((res) => {
        this.concertData = res.data;
        //console.log(this.concertData);
      })
      await axios.get('/api/data/musical').then((res) => {
        this.musicalData = res.data;
        //console.log(this.musicalData);
      })
      await axios.get('/api/data/play').then((res) => {
        this.exhibitData = res.data;
        //console.log(this.exhibitData);
      })
    }
  }
}
</script>
  
<style>
@import "../css/map.css";
</style>