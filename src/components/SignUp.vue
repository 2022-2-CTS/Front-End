<template>
  <div class="body-sign">
    <div v-if="state.realLoggedIn === true">
      {{goLogginedMap()}}
    </div>
    <div v-else class="main-title">
        <h1>부산시 문화예술 지도</h1>
    </div>
    <div>
      <div>
        <form class="login-item">
          <FormItem>
            <Input class="login" type="text" v-model="value" placeholder="아이디" @input="state.form.loginId = $event.target.value">
            </Input>
          </FormItem>
          <FormItem>
            <div class="field has-addons">
            <div class="control is-expanded">
              <input v-if="showPassword" type="text" class="login" placeholder="비밀번호" v-model="value" @input="state.form.loginPw = $event.target.value"/>
              <input v-else type="password" class="login" placeholder="비밀번호" v-model="value" @input="state.form.loginPw = $event.target.value"/>
            </div>
              <div class="control">
                <div class="button" @click="toggleShow" style="margin-left: 100px;">
                  <span class="icon is-small is-right">
                    <div>비밀번호 표시</div>
                  </span>
                </div>
              </div>
            </div>
          </FormItem>
          <div class="login-button" @click="submit()">
            로그인
          </div>
        </form>
      </div>
      <br />
      <div class="find-pw" style="color: red; font-size:13px; font-weight: 400; text-align: center;" v-if="state.loggedIn === false">로그인에 실패하였습니다.</div>
      <div class="find-pw" style="color: red; font-size:13px; font-weight: 400; text-align: center;" v-if="state.onlyIdMatch === true">비밀번호가 틀립니다.</div>
      <div class="regi">
        계정이 없으신가요?
        <div class="register"  @click="goRegister">회원가입</div>
      </div>
      <div class="find-pw" @click="this.$router.push('/findpw')">
        비밀번호 찾기
      </div>
    </div>
  </div>
</template>
  
  <script>

  import axios from "axios";
  import {reactive} from "vue";

  export default {
    setup(){
      const state = reactive({
        realLoggedIn:false,
        loggedIn:true,
        onlyIdMatch: false,

        account:{
          id: "",
        },
        form:{
          loginId:"",
          loginPw:"",
        }
      });

      const submit = () =>{
        const args = {
          lId: state.form.loginId,
          lPw: state.form.loginPw,
        }
        axios.post("/api/account", args).then((res) => {
          if(res.data === "only id match"){
            state.onlyIdMatch = true;       
          }else{
            state.account = res.data
            state.realLoggedIn = true;
            console.log(res.data);
          }
        }).catch(() => {
          state.loggedIn = false;
        })
        
      }

      axios.get("api/account").then((res) => {
        state.account = res.data
        console.log(state.account.id, state.account.name)
        alert("토큰값이 존재합니다.")
        state.realLoggedIn = true;
      });

      return { state , submit};
    },
    name: 'SignUp',
    data() {
        return {
          id:'',
          pw:'',
          check: '',
          showPassword: false,
          password: null
        }
    },
    methods:{
      toggleShow() {
        this.showPassword = !this.showPassword;
      },
      goRegister(){
        this.$router.push("/register");
      },
      goMap(){
        if(this.id == 'admin' && this.pw == '1234'){
          this.$router.push("/Map");
          this.check = true;
        }else{
          this.check = false;
          alert('유효하지 않은 아이디 입니다.')
        }
      },
      goLogginedMap(){
        this.$router.push("/Map");
      }
    },
    computed: {
      buttonLabel() {
        return (this.showPassword) ? "Hide" : "Show";
      }
    },
  }
  </script>
  
  <style>
  

  .body-sign{
    place-items:center;
    display:grid;
    min-height: 100vh;
    font-weight: 400;
    font-size: 15px;
  }

  .main-title{
    padding-top:15%;
  }

  .login-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login{
    border: 1px solid #D9D9D9;
    border-radius: 30px;
    padding: 20px;
    margin-top:20px;
    width:280px
  }

  .login-button{
    border: 0px solid #D9D9D9;
    border-radius: 30px;
    margin-top:20px;
    padding: 20px;
    background: rgb(243, 115, 33);
    width:50%;
    height: 46px;
    color:white;
    line-height: 0.4;
    justify-content: center;
    text-align: center;
  }

  .regi{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .find-pw{
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: rgb(43, 63, 107);
    font-weight: 600;
    line-height: 40px;
  }

  .register{
    color:rgb(243, 115, 33);
    font-weight: 600;
    margin-left: 10px;
    text-decoration-line: underline;
  }
  </style>
  