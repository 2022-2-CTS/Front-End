<template>
  <BottomNav :nowPage="nowPage"></BottomNav>

  <!-- 로딩 스피너 -->
  <div v-if="isLoading == true" 
  style="
  width: 100vw; 
  height: 100vh;
  vertical-align: center;
  " class="text-center d-flex align-items-center justify-content-center">
    <div class="spinner-border text-secondary text-center" role="status"
      style="width: 50px; height: 50px; border-width: 0.5em">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div>
      <!-- <div style="font-weight: 600; font-size: 20px; color: gray;">불러오는 중...</div> -->
    </div>
  </div>


  <div id="map">
    <div class="map-category">
      <ul class="map-list-style-ul">
        <li v-for="i in cultureData" :key="i" class="map-list-style-li">
          <div class="map-category-flex">
            <div class="map-category-circle map-category-item" @click="dataClick(i)" :class="{
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
            <div style="width: 10px;" />
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
          number: 0,
          color: 'red',
          click: true
        },
        {
          name: "연극",
          number: 1,
          color: 'blue',
          click: false
        },
        {
          name: "전시",
          number: 2,
          color: 'green',
          click: false
        },
        {
          name: "콘서트",
          number: 3,
          color: 'yellow',
          click: false
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

      // 행사 데이터 장소 4종류
      playLocation: [],
      concertLocation: [],
      musicalLocation: [],
      exhibitLocation: [],

      // 행사 데이터 4종류 (세부)
      /*
        json : [
          { 주소 : data },
          { 주소 : data },
          ...
        ]
      */
      playDataInData: [], // 눈속임용 모달창에 들어갈 데이터들...
      concertDataInData: [],
      musicalDataInData: [],
      exhibitDataInData: [],

      // 마커 배열
      markerArr: [],
      // 현재 위치
      nowLocMarker: null,

      // 로딩 여부
      isLoading: true,
    }
  },
  components: {
    BottomNav: BottomNav,
  },
  mounted: async function () {
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
  created: async function () {
  },
  methods: {
    // 맵 생성
    initMap: async function () {
      await this.request();
      var router = this.$router;
      // 데이터 종류에 따라 마커 그리는 함수
      async function drawMarker(nowObject, nowObjectLength, map, locationArr, dataArr, imgSrc, markerArr) {
        console.log("--now marker array1--");
        console.log(markerArr);
        // 주소-좌표 변환 객체 생성
        const geocoder = new kakao.maps.services.Geocoder();
        //console.log(imgSrc);
        //console.log("장소 개수 : " + Object.keys(nowObject).length);

        var router2 = router;

        // 장소의 개수만큼 반복
        for (var i = 0; i < nowObjectLength; i++) {
          var locationLength = Object.keys(nowObject[i][i]).length;
          //console.log("데이터 개수 : " + locationLength);
          //console.log(i + " : " + JSON.stringify(nowObject[i]));
          var positionData = nowObject[i][i];

          // 장소 객체 속 데이터의 개수만큼 반복
          for (var j = 0; j < locationLength; j++) {
            var locationData = positionData[j].data.location;
            var thisData = positionData[j];
            //console.log(j + " : " + JSON.stringify(locationData));

            // 현재 데이터의 장소가 이미 장소 배열에 존재함
            if (locationArr.includes(locationData)) {
              //console.log(locationArr.length - 1 + "번째 배열에 데이터 넣는 중");
              dataArr[locationArr.length - 1].push(positionData[j].data);
              continue;
            }
            // 현재 데이터의 장소가 장소 배열에 존재하지 않음
            else {
              // 장소 배열에 현재 데이터의 장소 추가
              locationArr.push(locationData);
              //console.log(locationArr.length + "번째 배열 생성");
              // 현재 데이터의 장소의 배열 추가
              dataArr.push([]);
              dataArr[locationArr.length - 1].push(positionData[j].data);
            }

            // 주소로 좌표를 검색
            geocoder.addressSearch(locationData, (result, status) => {
              var coords;
              var thisMarkerData = thisData;
              var realRouter = router2;
              // 정상적으로 검색이 완료됐으면 
              if (status === kakao.maps.services.Status.OK) {
                //console.log(result);
                coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                //console.log(coords);
                // 결과값으로 받은 위치를 마커로 표시
                const marker = new kakao.maps.Marker({
                  position: coords,
                  image: imgSrc
                });

                marker.setMap(map);
                markerArr.push(marker);

                // 마커에 클릭이벤트 등록
                kakao.maps.event.addListener(marker, 'click', function () {
                  console.log(thisMarkerData);

                  realRouter.push(
                    {
                      path: '/map/detail',
                      query: {
                        title: thisMarkerData.data.title,
                        op_st_dt: thisMarkerData.data.op_st_dt,
                        op_ed_dt: thisMarkerData.data.op_ed_dt,
                        showtime: thisMarkerData.data.showtime,
                        price: thisMarkerData.data.price,
                        imgSrc: thisMarkerData.data.imgSrc
                      }
                    }
                  );

                });

              }
            });
          }
        }
        console.log("marker draw end");
        console.log("--now marker array2--");
        console.log(markerArr);
      }

      if (this.map == null) {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(35.168923, 129.134230, 16),
          level: 4,
        };

        this.map = new kakao.maps.Map(container, options);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // 현재 위치 마커 초기화
          if (this.nowLocMarker != null) {
            this.nowLocMarker.setMap(null);
          }

          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

          console.log("lat : " + lat + ", lon : " + lon);

          this.myLat = lat;
          this.myLng = lon;

          // 내 위치!
          var locPosition = new kakao.maps.LatLng(lat, lon);

          // 현재 위치 마커
          var nowLocImage = new kakao.maps.MarkerImage(require('@/img/nowPosMarker.svg'), new kakao.maps.Size(50, 50));

          var nowLocMarker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(this.myLat, this.myLng),
            image: nowLocImage
          });

          this.nowLocMarker = nowLocMarker;
          this.nowLocMarker.setMap(this.map);

          // 부드럽게 지도 이동
          this.map.panTo(locPosition);
          // this.initMap();
        });
      }
      else {
        console.log("못씀");
      }


      console.log(this.markerArr);

      for (var i = 0; i < this.markerArr.length; i++) {
        this.markerArr[i].setMap(null);
      }

      this.markerArr = [];


      // 데이터 종류별 객체의 길이
      var playLength = Object.keys(this.playData).length;
      var concertLength = Object.keys(this.concertData).length;
      var musicalLength = Object.keys(this.musicalData).length;
      var exhibitLength = Object.keys(this.exhibitData).length;
      var callMap = this.map; // 콜백함수 내에서 쓸 map 복사본(?)
      //:src="require('@/img/infopage_icon_false.svg')"
      var playMarkerImage = new kakao.maps.MarkerImage(require("@/img/playMarker.svg"), new kakao.maps.Size(50, 50));
      var concertMarkerImage = new kakao.maps.MarkerImage(require("@/img/concertMarker.svg"), new kakao.maps.Size(50, 50));
      var musicalMarkerImage = new kakao.maps.MarkerImage(require("@/img/musicalMarker.svg"), new kakao.maps.Size(50, 50));
      var exhibitMarkerImage = new kakao.maps.MarkerImage(require("@/img/exhibitMarker.svg"), new kakao.maps.Size(50, 50));

      if (this.cultureData[1].click == true) {
        drawMarker(this.playData, playLength, callMap, this.playLocation, this.playDataInData, playMarkerImage, this.markerArr);
        //console.log(this.playLocation);
        //console.log(this.playDataInData);
      }

      if (this.cultureData[3].click == true) {
        drawMarker(this.concertData, concertLength, callMap, this.concertLocation, this.concertDataInData, concertMarkerImage, this.markerArr);
        //console.log(this.concertLocation);
        //console.log(this.concertDataInData);
      }

      if (this.cultureData[0].click == true) {
        drawMarker(this.musicalData, musicalLength, callMap, this.musicalLocation, this.musicalDataInData, musicalMarkerImage, this.markerArr);
        //console.log(this.musicalLocation);
        //console.log(this.musicalDataInData);
      }

      if (this.cultureData[2].click == true) {
        drawMarker(this.exhibitData, exhibitLength, callMap, this.exhibitLocation, this.exhibitDataInData, exhibitMarkerImage, this.markerArr);
        //console.log(this.exhibitLocation);
        //console.log(this.exhibitDataInData);
      }



      console.log("맵을 불러왔어!");
    },
    dataClick(i) {
      i.click = true;
      console.log(i.number + " click");


      for (var j = 0; j < 4; j++) {
        if (i.number != this.cultureData[j].number) {
          this.cultureData[j].click = false;
        }
        console.log(this.cultureData[j].click);
      }
      this.initMap();
    },
    request: async function () {
      // axios.get('/api/testtData').then((response) => {
      //   this.responseData = response.data;
      //   console.log("데이터를 받아왔어!");
      // }).catch(err => {
      //   alert(err);
      //   console.log(err);
      // });
      await console.log("로딩 현황: " + this.isLoading);
      await this.getDatas();
      await this.isLoadingToggle();
    },
    getDatas: async function () {
      await axios.get('/api/data/play').then((res) => {
        this.playData = res.data;
        console.log("play ready");
        //console.log(this.playData);
      })
      await axios.get('/api/data/concert').then((res) => {
        this.concertData = res.data;
        console.log("concert ready");
        //console.log(this.concertData);
      })
      await axios.get('/api/data/musical').then((res) => {
        this.musicalData = res.data;
        console.log("musical ready");
        //console.log(this.musicalData);
      })
      await axios.get('/api/data/exhibit').then((res) => {
        this.exhibitData = res.data;
        console.log("exhibit ready");
        //console.log(this.exhibitData);
      })
    },
    isLoadingToggle: async function () {
      if(this.isLoading == true){
        this.isLoading = false;
      }
      await console.log("로딩 현황: " + this.isLoading);
    }
  }
}
</script>
  
<style>
@import "../css/map.css";
</style>