<template>
    <div class="bottom-nav-container-of-container">
        <div class="bottom-nav-container">
            <div class="bottom-nav-item" 
            @click="bottomBarPageMove(); clickBottomIcon = 0;">
                <img v-if="nowPage == 0"
            @click="bottomBarPageMove(); clickBottomIcon = 0;"
                :src="require('@/img/infopage_icon_true.svg')" style="width: 40px;"  />
                <img v-else
            @click="bottomBarPageMove(); clickBottomIcon = 0;"
                :src="require('@/img/infopage_icon_false.svg')" style="width: 40px;"  />
            </div>

            <div class="bottom-nav-item" 
            @click="bottomBarPageMove(); clickBottomIcon = 1;">
                <img v-if="nowPage == 1"
            @click="bottomBarPageMove(); clickBottomIcon = 1;"
                :src="require('@/img/map_icon_true.svg')" 
                style="width: 36px;" />
                <img v-else
            @click="bottomBarPageMove(); clickBottomIcon = 1;"
                :src="require('@/img/map_icon_false.svg')" 
                style="width: 36px;" />
            </div>

            <div class="bottom-nav-item" 
            @click="bottomBarPageMove(); clickBottomIcon = 2;">
                <img v-if="nowPage == 2"
            @click="bottomBarPageMove(); clickBottomIcon = 2;"
                :src="require('@/img/mypage_icon_true.svg')"
                style="width: 40px;" />
                <img v-else
            @click="bottomBarPageMove(); clickBottomIcon = 2;"
                :src="require('@/img/mypage_icon_false.svg')" style="width: 40px;" />
            </div>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'BottomNav',
    data() {
        return {
            clickBottomIcon: null,
        }
    },
    components: {
        
    },
    props: {
        nowPage: {
            type: Number
        }
    },
    methods: {
        bottomBarPageMove() {
            if (this.clickBottomIcon == 0) {
                console.log("info")
                this.$router.push('/info');
            }
            else if (this.clickBottomIcon == 1) {
                console.log("map")
                this.$router.push('/map');
            }
            else if (this.clickBottomIcon == 2) {
                console.log("mypage")
                this.$router.push('/mypage');
            }
        }
    }
  }
  </script>
  
  <style>
@import "../css/bottomNav.css";
  </style>
  