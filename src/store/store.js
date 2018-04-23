import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store=new Vuex.Store({
  state:{
    menuItems:{},
    currentUser:null,
    isLogin:false
  //  改变属性的状态
  },
  getters:{
  //  获取属性的状态
    currentUser:state=>state.currentUser,
    isLogin:state=>state.isLogin
  },
  mutations:{
  //  应用mutations
    setMenuItems(state,data){
      state.menuItems=data
    },
    // 将匹配到对象，在menuItems中删除
    removeMenuItems(state,data){
      state.menuItems.forEach((item,index)=>{
        if (item == data){
          state.menuItems.splice(index,1)
        }
      })
    },
    // 将新添加的pizza添加到属性menuItems中
    pushToMenuItems(state,data){
      state.menuItems.push(data)
    },
  //  更改用户的状态信息
    userStatus(state,user){
      if (user){
        state.currentUser=user;
        state.isLogin=true;
      }else {
        state.currentUser=null;
        state.isLogin=false;
      }
    }
  },
  actions:{
    setUser({commit},user){
      commit("userStatus",user)
    }
  }
})
