import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from "./routes";
//导入库
import axios from 'axios'
import {store} from './store/store'
//使用路由
Vue.use(VueRouter)
//全局配置一个基础地址
axios.defaults.baseURL='https://wd4260665034qrgued.wilddogio.com/'
//实例化一个router
const router = new VueRouter({
  routes,
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }else {
      return {x:0,y:0}
    }
  }
})
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
