<template>
  <div>
  <div class="wrapper">
    <div class="body-regi">
        <h1 style="margin-top:0px">회원가입</h1>
        <label class="check-body" v-for="checkboxes in 3" :key="checkboxes">
          <Input class="checkbox-round" type="checkbox" />
          <span>
            <button class="modal-button" @click="clickKey = checkboxes-1, console.log(clickKey), isModalViewed=true">
              {{checkList[checkboxes-1]}}
            </button>
          </span>
          <ModalView v-if="isModalViewed && clickKey == checkboxes-1" @close-modal="isModalViewed = false">
            <div v-if="clickKey == 0" class="modal-scroll">
              <PersonalDataAgree />
            </div>
            <div v-if="clickKey == 1">
              <LocationAgree />
            </div>
            <div v-if="clickKey == 2">
              <ADAgree />
            </div>
          </ModalView>
        </label>

        <div class="input-id">
          <label for="Rid">아이디</label>
          <Form style="margin-top:10px">
            <Input class="input-blank" type="text" v-model="value" @input="state.form.Rid = $event.target.value"></Input>
            <span class="input-button" @click="validateCheck">중복확인</span>
            <div class="validate-check" v-if="state.validate === true">사용할 수 있는 아이디 입니다.</div>
            <div class="validate-check" v-if="state.validate === false">사용할 수 없는 아이디 입니다.</div>
          </Form>
        </div>
        <div class="input-pw">
          <br/>
          <label for="Rpw">비밀번호</label>
          <Form style="margin-top:10px">
            <Input type="text" class="input-blank-pw" v-model="value" @input="state.form.Rpw = $event.target.value, console.log(state.form.Rpw)"></Input>
          </Form>
        </div>
        <div class="input-pw">
          <br/>
          <label>비밀번호 확인</label>
          <Form style="margin-top:10px">
            <Input type="text" class="input-blank-pw" v-model="value" @input="state.form.RpwCheck = $event.target.value, console.log(state.form.RpwCheck)">{{Equalcheck()}}</Input>
            <div class="validate-check" v-if="state.pwEqCheck === true">비밀번호가 일치합니다.</div>
            <div class="validate-check" v-if="state.pwEqCheck === false">비밀번호가 일치하지 않습니다.</div>
          </Form>
        </div>
        <div class="input-id">
          <label for="Rphone">휴대폰 번호</label>
          <Form style="margin-top:10px">
            <Input type="text" class="input-blank" id="Rphone" v-model="value" @input="state.form.Rphone = $event.target.value"></Input>
            <button class="input-button">인증요청</button>
          </Form>
        </div>
        <div class="input-id">
          <label>인증번호 입력</label>
          <Form>
            <Input class="input-blank" @input="cert = $event.target.value"></Input>
            <button class="input-button" style="width:74px">확인</button>
          </Form>
        </div>
        <div class="final-btn">
          <button v-if="state.validate === true && state.pwEqCheck === true" class="final-button" @click="submit">가입 완료</button>
          <button v-else disabled="true" class="final-button" @click="submit">가입 완료</button>
        </div>
    </div>
  </div>
</div>
  </template>
  
  <script>

  import ModalView from "./ModalView.vue";
  import ADAgree from "./ADAgree.vue";
  import PersonalDataAgree from "./PersonalDataAgree.vue";
  import LocationAgree from "./LocationAgree.vue";
  import {reactive} from "vue"; 
  import axios from "axios";

  export default {
    name: 'Register', 
    setup(){
      const state = reactive({
        loggedIn:false,
        account:{
          mid: null,
          memberName: "",
        },
        form:{
          Rid: "",
          Rpw: "",
          RpwCheck: "",
          Rphone: "",
        },
        validate: "true",
        pwValidate : "true",
        pwEqCheck : "false",
      });
      console.log(state.form.Rid);
      axios.get("/api/register").then((res) => {
        console.log(res);
      })

      const submit = () => {
        const args = {
          Rid : state.form.Rid,
          Rpw : state.form.Rpw,
          Rphone : state.form.Rphone,
        };
        axios.post("/api/register", args).then((res) => {
          console.log(res);
        });
      };
      
      const validateCheck = () => {
        const args = {
          Rid : state.form.Rid,
        };
        axios.post("/api/check", args).then((res)=>{
          console.log(res.data);
          for(var i=0; i<res.data.length; i++){
            const Rid = state.form.Rid
            console.log(res.data[i].id)
            if(Rid === res.data[i].id){
              console.log(Rid, res.data[i].id)
              state.validate = false;
              break;
            }else{
              console.log(Rid, res.data[i].id)
              state.validate = true;
              console.log(state.validate)
            }
          }
        });
      };

      const Equalcheck = () => {
        if(state.form.Rpw === state.form.RpwCheck){
          state.pwEqCheck = true;
        }else{
          state.pwEqCheck = false;
        }
      }

      return {state, submit, validateCheck, Equalcheck}
    },
    data() {
        return {
          checkList : ['개인정보 수집 및 이용 동의', '위치 정보 수집 동의', '광고성 수신 동의'],
          validate: false,
          clickKey: 0,
          isModalViewed: false,         
        }
    },
    computed: {
      console: () => console,
    },
    methods:{
      goSignUp(){
        this.$router.push('/')
      },
    },
    components: {
    ModalView,
    ADAgree,
    PersonalDataAgree,
    LocationAgree
}
  }
  </script>
  
  <style>
  @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);
  @media(min-width:1200px){
      .body-regi{
        font-family: 'Noto Sans KR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
      width:300px;
      position: absolute;
      left:39vw;
      top:100px;
      padding-bottom:100px;
    } 
  }

  @media(min-width:576px) and (max-width:1199px){
      .body-regi{
        font-family: 'Noto Sans KR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
      width:300px;
      position: absolute;
      left:28vw;
      top:100px;
      padding-bottom:100px;
    } 
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .body-regi{
      font-family: 'Noto Sans KR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
      width:300px;
      position: absolute;
      left:10vw;
      top:100px;
      padding-bottom:100px;
    } 
  }

  @media(min-width:377px) and (max-width: 575px){
    .body-regi{
      font-family: 'Noto Sans KR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
      width:300px;
      position: absolute;
      left:10vw;
      top:100px;
      padding-bottom:100px;
    }
  }

  @media(max-width: 376px){
    .body-regi{
      width:300px;
      position: absolute;
      left:14vw;
      top:100px;
      padding-bottom:100px;
    }
  }

  .body-regi h1{
    width:calc(80vh - 250px);
  }

  .check-body{
    display: flex;
    vertical-align: middle;
  }

  .body-regi span{
    vertical-align: middle;
    color:white;
    overflow: visible;
  }

  .checkbox-round {
    width: 1.3em;
    height: 1.3em;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #ddd;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
}

.modal-button{
  border: 0px;
  background:white;
}

.checkbox-round:checked {
    background-color: #E37A39;
}

.input-id{
  margin-top: 30px;
  width:calc(80vh - 250px);
}

.input-blank{
  border: 1px solid #D9D9D9;
  border-radius: 30px;
  padding: 10px;
  padding-right: 34px;
  width:calc(70vh - 310px);
}

.input-button{
  border:0px;
  border-radius: 30px;
  padding:10px;
  margin-left: 1%;
  color: white;
  background: #E37A39;
}

.validate-check{
  color: #E37A39;
  font-size: 12px;
  margin-top: 8px;
}

.input-pw{
  width:calc(50vh - 100px);
}

.input-blank-pw{
  border: 1px solid #D9D9D9;
  border-radius: 30px;
  padding: 10px;
  width:calc(72vh - 250px);
  padding-right: 10%;
}

.final-btn{
  width:calc(75vh - 230px);
}

.final-button{
  border:0px;
  border-radius: 30px;
  background: #2F3F67;
  color:white;
  font-weight: 600;
  font-size:19px;
  margin-top: 30px;
  padding-top:13px;
  padding-bottom:13px;
  width:100%;
}

.modal-scroll{
overflow-y: auto;
}
  </style>
  