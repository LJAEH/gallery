<template>
  <div class="order">
    <div class="container">
      <table class=" table table-bordered">
        <thead>
          <tr>
            <th>주문번호</th>
            <th>주문자명</th>
            <th>주소</th>
            <th>결제수단</th>
            <th>구입항목</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, idx) in state.orders" :key="idx">
            <td>{{ state.orders.length -idx }}</td>
            <td>{{ o.name }}</td>
            <td>{{ o.address }}</td>
            <td>{{ o.payment }}</td>
            <td>
              <div v-for="(d, idx2) in o.items" :key="idx2">
                {{ d.name }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>

  </div>
</template>

<script>
import { reactive } from "vue";
import axios from 'axios';

export default {
  
  methods: {
    numberFormatter(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  setup() {
    const state = reactive({
      orders:[]

    })
    axios.get("/api/orders").then(({data})=>{
      console.log(data);
      state.orders =[];
      for(let d of data){
        d.items = JSON.parse(d.items);
        state.orders.push(d);
      }
    })

    return {state} ;
  }
}

</script>


<style scoped>
.order-box * {
  text-align: left;
}

.btn {
  text-align: center;
}
.table {
  margin-top: 30px;
}

.table > tbody {
  border-top: 1px solid #eee;
}
</style>