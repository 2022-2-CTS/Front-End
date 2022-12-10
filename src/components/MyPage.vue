<template>
  <div>
    <div class="mP-title">
      내정보
    </div>
    <div class="post-display">
      <div>
        <div class="my-info">
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
    <div v-for="(v, i) in 3" :key="i">
    <div class="fav-card">
      <div class="fav-card-title">이것은 행사 이름입니다</div>
      <img :src="require('@/img/heart_true.svg')" class="fav-icon"/>
    </div>
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'MyPage',
  data() {
    return {

    }
  },
  components: {

  }
}
</script>
  
<style>
@import "../css/myPage.css";
</style>
  