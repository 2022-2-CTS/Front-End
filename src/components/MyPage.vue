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
        <Input class="post-disinput"></Input>
      </div>
      <div>
        <div class="my-info">
          휴대폰 번호
        </div>
        <Input class="post-input"></Input>
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
    <div v-for="(v, i) in 4" :key="i">
    <div class="fav-card">
      <div class="fav-card-title">이것은 행사 이름입니다</div>
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
  