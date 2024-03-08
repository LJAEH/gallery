<template>
  <div class="cart">
    <div class="container">
      <ul>
        <li v-for="(i,idx) in state.items" :key="idx">
          <img :src="i.imgPath">
          <span class="name">{{ i.name }}</span>
          <span class="price">{{numberFormatter(i.price-i.price*i.discountPer) }} 원</span>
          <i class="fa fa-trash" @click="remove(i.id)"></i>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import {reactive} from "vue";
import axios from 'axios';

export default{
  methods: {
        numberFormatter(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
  },
  setup(){
    const state = reactive({
     items : []
    })

    const load = () => {    
      axios.get("/api/cart/items").then(({data}) => {
        console.log(data);
        state.items = data;
      })
    }

    const remove = (itemId) => {
      axios.delete(`/api/cart/items/${itemId}`).then(()=>{
        load();
      })
    }

    load();

    return {state , remove}
  }
}

</script>


<style scoped>
.cart ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cart ul li {
  border: 1px solid #eee;
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex; /* Add display: flex for horizontal alignment */
  justify-content: space-between; /* Align items at the beginning and end */
}

.cart ul li img {
  width: 150px;
  height: 150px;
}

.cart ul li .name,
.cart ul li .price {
  margin-left: 25px; /* Apply to both elements */
  align-self: center; /* Vertically align text within the flex item */
}

.cart ul li i {
  font-size: 20px;
  /* No need for float: right; with flexbox */
  margin: auto; /* Adjust margin as needed for vertical alignment */
  margin-right: 30px; /* Adjust margin for spacing */
}

.cart .btn {
  width: 300px;
  display: block;
  margin: 0 auto;
  padding: 30px 50px;
  font-size: 20px;
}
</style>