<template>
  <div class="row">
    <!--菜单-->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
        <tr>
          <th>尺寸</th>
          <th>价格</th>
          <th>加入</th>
        </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
        <tr>
          <td><strong>{{item.name}}</strong></td>
        </tr>
        <tr v-for="option in item.options" :key="option.size">
          <td>{{option.size}}</td>
          <td>{{option.price}}</td>
          <td>
            <button class="btn btn-sm btn-outline-success" @click="addToBasket(item,option)">+</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--购物车-->
    <div class="col-sm-12 col-md-4">
      <div v-if="basktes.length>0">
        <table class="table">
          <thead class="thead-default">
          <tr>
            <th>数量</th>
            <th>品种</th>
            <th>价格</th>
          </tr>
          </thead>
          <tbody v-for="item in basktes " v-bind:key="item.name">
          <tr>
            <td>
              <button class="btn btn-sm" @click="decreaseQuantity(item)">-</button>
              <span>{{item.quantity}}</span>
              <button class="btn btn-sm" @click="increaseQuantity(item)">+</button>
            </td>
            <td>{{item.name}} | {{item.size}}寸</td>
            <td>{{item.price*item.quantity}}</td>
          </tr>
          </tbody>
        </table>
        <p>总价：{{total+"RMB"}}</p>
        <button class="btn btn-success btn-block">提交</button>
      </div>
      <div v-else>{{basktesText}}</div>
    </div>
  </div>
</template>r

<script>
  export default {
    data() {
      return {
        basktes: [],
        basktesText: "购物车没有任何商品",
        // getMenuItems: {}
      }
    },
    computed:{
      getMenuItems(){
        return this.$store.state.menuItems
      },
      //实现计算商品总价
      total(){
        let totalCost=0;
        for(let index in this.basktes){
          //拿到每一个对象,对其数量*价格进行累加
          let individualItem=this.basktes[index];
          totalCost +=individualItem.quantity*individualItem.price;
        }
        return totalCost;
      }
    },
    created(){
      this.fechData();
    },
    methods: {
      fechData(){
        fetch("https://wd4260665034qrgued.wilddogio.com/menu.json").then(res=>res.json()).then(data=>this.$store.commit("setMenuItems",data))
      },
      //执行将商品添加购物车
      addToBasket(item, option) {
        let baskte={
          name: item.name,
          size: option.size,
          price: option.price,
          quantity: 1
        };
        if (this.basktes.length>0){
        //  过滤
          let result=this.basktes.filter((baskte)=>{
            return (baskte.name===item.name &&baskte.price===option.price)
          })
          if (result!=null&&result.length>0){
            result[0].quantity++
          }else {
            this.basktes.push(baskte)
          }
        }else {
          this.basktes.push(baskte);
        }
      },
      //判断数量是否小于等于0，若是，执行移除
      decreaseQuantity(item) {
        item.quantity--;
        if (item.quantity <= 0) {
          this.removeFormBasket(item);
        }
      },
      increaseQuantity(item) {
        item.quantity++;
      },
      //移除当前条
      removeFormBasket(item) {
        this.basktes.splice(this.basktes.indexOf(item), 1)
      }
    },
  }
</script>

<style>

</style>
