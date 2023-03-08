<template>
  
  <BottomNav :nowPage="nowPage"></BottomNav>
  <div>
    <div class="mP-title">
      내정보
    </div>
    <hr/>
    <div class="post-display">
      <div>
        <div class="my-info ">
          아이디
        </div>
        <Input class="post-disinput" placeholder="miseon1221"></Input>
      </div>
      <div>
        <div class="my-info">
          휴대폰 번호
        </div>
        <Input class="post-input" placeholder="010-2001-1221"></Input>
        <div>
          <div class="my-info">
            비밀번호
          </div>
          <Input class="post-input"></Input>
        </div>
        <div>
          <div class="my-info">
            비밀번호 확인
          </div>
          <Input class="post-input"></Input>
        </div>
      </div>
      <div class="w-button">저장</div>
    </div>
    <hr style="margin-Top:50px"/>
    <div class="mP-title">찜목록</div>
    <div v-for="(v, i) in item" :key="i">
    <div class="fav-card">
      <div class="fav-card-title">{{ v }}</div>
      <img :src="require('@/img/heart_true.svg')" class="fav-icon" style="width: 40px; height: 40px;"/>
    </div>
    </div>
  </div>

  <br/>
  <br/>
  <br/>
  <br/>
</template>
  
<script>
import BottomNav from "./BottomNav.vue";

export default {
  name: 'MyPage',
  data() {
    return {
      nowPage: 2,
      item: [
        "각진원형 : 김용관",
        "Habitat One",
        '뮤지컬＜캣츠＞오리지널 내한',
        '크리스마스 칸타타 2022'
      ]
    }
  },
  components: {
    BottomNav: BottomNav,
  },
}
</script>
  
<style>
@import "../css/myPage.css";
</style>
  