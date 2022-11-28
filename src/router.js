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
      path: "/map/detail/:id",
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
      path: "/info/post",
      component: InfoPost,
    },
    {
      path: "/info/together",
      component: InfoTogether,
    },
    {
      path: "/mypage",
      component: MyPage,
    },
    {
      path: "/test",
      component: test,
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router; 