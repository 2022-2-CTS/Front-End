import { createWebHistory, createRouter } from "vue-router";
import SignUp from '@/components/SignUp.vue';
import Register from '@/components/Register.vue';
import FindPw from '@/components/FindPw.vue';
import Map from '@/components/Map.vue';
import Detail from '@/components/Detail.vue';
import InfoShare from '@/components/InfoShare.vue';
import InfoPost from '@/components/InfoPost.vue';
import InfoTogether from '@/components/InfoTogether.vue';
import MyPage from '@/components/MyPage.vue';
import Info from '@/components/Info.vue';
import test from '@/components/test.vue';
import Chatting from '@/components/Chatting.vue';
import InfoPostTogether from '@/components/infoPostTogether.vue';

const routes = [
    {
        path: "/",
        component: SignUp,
    },
    {
      path: "/signup",
      component: SignUp,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/findpw",
      component: FindPw,
    },
    {
      path: "/map",
      component: Map,
    },
    {
      path: "/map/detail",
      component: Detail,
    },
    {
      path: "/info",
      component: Info,
    },
    {
      path: "/info/share",
      component: InfoShare,
    },
    {
      path: "/info/share/post",
      component: InfoPost,
    },
    {
      path: "/info/together",
      component: InfoTogether,
    },
    {
      path: "/info/together/post",
      component: InfoPostTogether,
    },
    {
      path: "/mypage",
      component: MyPage,
    },
    {
      path: "/test",
      component: test,
    },
    {
      path: "/chat",
      component: Chatting,
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router; 