<template>
  <BottomNav :nowPage="nowPage"></BottomNav>

  <div id="map">
    <div class="map-category">
      <ul class="map-list-style-ul">
        <li v-for="i in cultureData" :key="i" class="map-list-style-li">
          <div class="map-category-flex">
            <div class="map-category-circle map-category-item" :class="{ 
             'map-category-circle-red' : i.color == 'red',
             'map-category-circle-blue' : i.color == 'blue',
             'map-category-circle-green' : i.color == 'green',
             'map-category-circle-yellow' : i.color == 'yellow'
            }">
            </div>
            <div class="map-category-item">
              {{ i.name }}
            </div>
          </div>
        </li>
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
            {{responseData}}
        </div>

      </div>
    </div>

  </div>
</template>
  
<script>
import BottomNav from "./BottomNav.vue";
import axios from 'axios';

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
      playdata:[],
      concertdata:[],
      musicaldata:[],
      exhibitdata:[],
    }
  },
  components: {
    BottomNav: BottomNav,
  },
  mounted() {
    // window 객체에 kakao가 등록되어있는지 확인하고, 없을 때만 로딩
    if (!window.kakao || !window.kakao.maps) {
      // script 태그 객체 생성
      const script = document.createElement("script");
      // src 속성을 추가하며 .env.local에 등록한 service 키 활용
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=	403841fc6ce405f4d15772e3fb808956';

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
      this.initMap();
    }
  },
  created() {
    this.request();
  },
  methods: {
    // 맵 생성
    initMap() {
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

      // 마커를 생성합니다
      var testMarker = new kakao.maps.Marker({
        position: testMarkerPosition,
        clickable: true,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      testMarker.setMap(this.map);

      kakao.maps.event.addListener(testMarker, 'click', () => {
        if (!this.testModal) {
          this.testModal = true;
        }
        else {
          this.testModal = false;
        }

      });

      console.log("맵을 불러왔어!");
    },
    request() {
      // axios.get('/api/test').then((response) => {
      //   this.responseData = response.data;
      //   console.log("데이터를 받아왔어!");
      // }).catch(err => {
      //   alert(err);
      //   console.log(err);
      // });
      axios.get('/api/data/play').then((res)=>{
        this.playdata=res.data;
        console.log(this.playdata);
      })
      axios.get('/api/data/concert').then((res)=>{
        this.concertdata=res.data;
        console.log(this.concertdata);
      })
      axios.get('/api/data/musical').then((res)=>{
        this.musicaldata=res.data;
        console.log(this.musicaldata);
      })
      axios.get('/api/data/play').then((res)=>{
        this.exhibitdata=res.data;
        console.log(this.exhibitdata);
      })
    }
  }
}
</script>
  
<style>
@import "../css/map.css";
</style>