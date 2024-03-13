<template>
  <div class="order">
    <div class="container">
      <div class="py-5 text-center">
        <h2>주문하기</h2>
      </div>
      <div class="order-box row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3"><span class="text-primary">
              주문 상품</span><span class="badge bg-primary rounded-pill">{{ state.items.length }}</span></h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(i, idx) in state.items" :key="idx">
              <div>
                <h6 class="my-0">{{ i.name }}</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">{{ numberFormatter(i.price - (i.price * i.discountPer / 100)) }}원</span>
            </li>

            <li class="list-group-item d-flex justify-content-between"><span>총 금액</span><strong>{{
                numberFormatter(computedPrice) }}원</strong></li>
          </ul>
        </div>
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">주문 정보</h4>
          <div class="needs-validation" novalidate="">
            <div class="row g-3">
              <div class="col-12"><label for="username" class="form-label">이름</label>
                <input type="text" class="form-control" id="username" placeholder="Username" v-model="state.form.name">
                <div class="invalid-feedback"> 사용가능한 이름입니다. </div>
              </div>
              <div class="col-12"><label for="address" class="form-label">주소</label>
                <!-- 주소등록 api -->
                <!-- <button class="postCode" @click="postPopup()"> 주소 등록 </button> 
                <input type="text" v-model="postcode" placeholder="우편번호"> -->
                <input type="text" class="form-control" v-model="state.form.address" >
                <div class="invalid-feedback"> 주소를 입력해주세요 </div>
              </div>
              <div class="col-12"><label for="address" class="form-label">상세 주소</label>
                <input type="text" class="form-control" v-model="state.form.detailAddress" >
                <div class="invalid-feedback"> 주소를 입력해주세요 </div>
              </div>
            </div>
            <hr class="my-4">
            <h4 class="mb-3">결제수단</h4>
            <div class="my-3">
              <div class="form-check">
                <input id="card" name="paymentMethod" type="radio" class="form-check-input"  v-model="state.form.payment" value="card">
                <label class="form-check-label" for="card">신용카드</label>
              </div>
              <div class="form-check">
                <input id="bank" name="paymentMethod" type="radio" class="form-check-input"  v-model="state.form.payment" value="bank">
                <label class="form-check-label" for="bank">무통장입금</label>
              </div>
            </div>
            <div class="row gy-3">
              <label for="cc-name" class="form-label">카드번호</label>
              <input type="text" class="form-control" id="cc-name" v-model="state.form.cardNumber">
              <div class="invalid-feedback"> Name on card is required </div>
            </div>
            <hr class="my-4">
            <button class="w-100 btn btn-primary btn-lg" @click="submit()">주문하기</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { computed, reactive } from "vue";
import axios from 'axios';

export default {
  data() {
    return {
      postcode: "",

    }
  },
  methods: {
    numberFormatter(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  setup() {
    const state = reactive({
      items: [],
      form: {
        name: "",
        addess: "",
        payment: "",
        cardNumber: "",
        items: ""
      }
    })

    const load = () => {
      axios.get("/api/cart/items").then(({ data }) => {
        console.log(data);
        state.items = data;
      })
    }

    const computedPrice = computed(() => {
      let result = 0;
      for (let i of state.items) {
        result += i.price - i.price * i.discountPer / 100;

      }
      return result;
    })

    const submit = () => {
      const args = JSON.parse(JSON.stringify(state.form));
      args.items = JSON.stringify(state.items);
      axios.post("/api/orders" , args ).then(()=>{
        console.log('orderSuccess');
      }) 
    }

    load();

    return { state, computedPrice ,submit }
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
</style>