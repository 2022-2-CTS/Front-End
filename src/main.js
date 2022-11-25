import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'

//  .use(BootstrapVue)

createApp(App).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.$axios = axios; 