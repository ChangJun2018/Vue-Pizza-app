<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!--new pizza-->
      <app-new-pizza></app-new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
      <!--品种展示-->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table table-default">
        <thead>
        <th>品种</th>
        <th>删除</th>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
        <tr>
          <td>{{item.name}}</td>
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="deleteDate(item)">&times;</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import NewPizza from './NewPizza'

  export default {
    data(){
      return{
        // getMenuItems:[]
      }
    },
    components: {
      'app-new-pizza': NewPizza
    },
    computed:{
      getMenuItems:{
        //在vuex中获取数据
        get(){
          return this.$store.state.menuItems
        },
        set(){

        }
      },
    },
    created(){
      fetch("https://wd4260665034qrgued.wilddogio.com/menu.json").then(res=>{
        return res.json()
      }).then(data=>{
        let menuArray=[];
        for(let key in data){
          data[key].id=key;
          menuArray.push(data[key]);
        }
        //数据同步
        this.$store.commit('setMenuItems',menuArray)
        // this.getMenuItems=menuArray;
      })
    },
    methods:{
      deleteDate(item){
        fetch("https://wd4260665034qrgued.wilddogio.com/menu/"+item.id+"/.json",{
          method:"DELETE",
          headers:{
            'Content-type':'application/json'
          }
        }).then(res=>res.json()).then(data=>{
          this.$store.commit('removeMenuItems',item)
        }).catch(err=>console.log(err))
      }
    }
  }
</script>

<style>

</style>
