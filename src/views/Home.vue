<template>
  <h1>丁丁記帳</h1>
  <div class="container">
    <div class="post-block">
      <thead>
        <tr>
          <th><h3>日期</h3></th>
          <th><h3>收入</h3></th>
          <th><h3>支出</h3></th>
          <th><h3>物品</h3></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Datepicker v-model="date"></Datepicker></td>
          <td><input type="number" v-model="income" placeholder="輸入數字"/></td>
          <td><input type="number" v-model="pay" placeholder="輸入數字"/></td>
          <td><input type="text" v-model="object" placeholder="輸入物品"/></td>
          <td><button @click="postMoneyAccounting()">新增</button></td>
        </tr>
      </tbody>
    </div>
    <div class="list-block">
      <thead>
        <tr>
          <th><h3>日期</h3></th>
          <th><h3>收入</h3></th>
          <th><h3>支出</h3></th>
          <th><h3>物品</h3></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td><span>{{new Date(item.today).toLocaleDateString("en-CA")}}</span></td>
          <td><span>{{item.income}}</span></td>
          <td><span>{{item.pay}}</span></td>
          <td><span>{{item.object}}</span></td>
          <td><span><button @click="deleteMoneyAccounting(item.id)">刪除</button></span></td>
        </tr>
      </tbody>
    </div>
  </div>
</template>
  
<script>
import { ref, onBeforeMount} from "vue";
import axios from "axios";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'Home',
  components:{Datepicker},
  //vue3 composition api
  //setup中只能寫同步函式
  setup(){
    const list=ref(null)
    const id=ref(new Date().getTime())
    const date=ref(null)
    const income=ref(0)
    const pay=ref(0)
    const object=ref("")

    onBeforeMount(()=>{
      getMoneyAccounting()
    })
    

    //函式非同步寫法
    const getMoneyAccounting=async()=>{
      axios.get('http://localhost:3000/data').then((res)=>{
      list.value=res.data
      })
    }
    const postMoneyAccounting=async()=>{
      axios.post('http://localhost:3000/data',{
        id:id.value,
        today:new Date(date.value).toLocaleDateString("en-CA"),
        income:income.value,
        pay:pay.value,
        object:object.value
      })
      getMoneyAccounting()
    }
    
    const deleteMoneyAccounting=async(id)=>{
      axios.delete(`http://localhost:3000/data/${id}`)
      getMoneyAccounting()
    }

    return{
      list,id,date,income,pay,object,getMoneyAccounting,postMoneyAccounting,deleteMoneyAccounting
    }
  },
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>