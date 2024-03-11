<template>
  <div class="order">
    <div class="container">
      <div class="py-5 text-center">
        <h2>주문하기</h2>
      </div>
      <div class="order-box row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3"><span class="text-primary">
              주문 상품</span><span class="badge bg-primary rounded-pill">3</span></h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Product name</h6><small class="text-muted">Brief description</small>
              </div><span class="text-muted">$12</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Second product</h6><small class="text-muted">Brief description</small>
              </div><span class="text-muted">$8</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 class="my-0">Third item</h6><small class="text-muted">Brief description</small>
              </div><span class="text-muted">$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6><small>EXAMPLECODE</small>
              </div><span class="text-success">−$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between"><span>Total (USD)</span><strong>$20</strong></li>
          </ul>
          <form class="card p-2">
            <div class="input-group"><input type="text" class="form-control" placeholder="Promo code"><button
                type="submit" class="btn btn-secondary">Redeem</button></div>
          </form>
        </div>
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">주문자 정보</h4>
          <form class="needs-validation" novalidate="">
            <div class="row g-3">
            <div class="col-12"><label for="username" class="form-label">이름</label>
              <div class="input-group has-validation"><span class="input-group-text">@</span><input type="text"
                  class="form-control" id="username" placeholder="Username" required="">
                <div class="invalid-feedback"> 사용가능한 이름입니다. </div>
              </div>
            </div>
            <div class="col-12"><label for="address" class="form-label">주소</label><input type="text"
                class="form-control" id="address" placeholder="1234 Main St" required="">
              <div class="invalid-feedback"> 주소를 입력해주세요 </div>
            </div>
          </div>
          <hr class="my-4">
          <h4 class="mb-3">결제수단</h4>
          <div class="my-3">
            <div class="form-check"><input id="credit" name="paymentMethod" type="radio" class="form-check-input"
                checked="" required=""><label class="form-check-label" for="credit">Credit card</label></div>
            <div class="form-check"><input id="debit" name="paymentMethod" type="radio" class="form-check-input"
                required=""><label class="form-check-label" for="debit">Debit card</label></div>
            <div class="form-check"><input id="paypal" name="paymentMethod" type="radio" class="form-check-input"
                required=""><label class="form-check-label" for="paypal">PayPal</label></div>
          </div>
          <div class="row gy-3">
            <div class="col-md-6"><label for="cc-name" class="form-label">Name on card</label><input type="text"
                class="form-control" id="cc-name" placeholder="" required=""><small class="text-muted">Full name as
                displayed on card</small>
              <div class="invalid-feedback"> Name on card is required </div>
            </div>
            <div class="col-md-6"><label for="cc-number" class="form-label">Credit card number</label><input type="text"
                class="form-control" id="cc-number" placeholder="" required="">
              <div class="invalid-feedback"> Credit card number is required </div>
            </div>
          </div>
          <hr class="my-4"><button class="w-100 btn btn-primary btn-lg" type="submit">주문하기</button>
        </form>
      </div>
    </div>
  </div>

</div></template>

<script>
import { reactive } from "vue";
import axios from 'axios';

export default {
  methods: {
    numberFormatter(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  setup() {
    const state = reactive({
      items: []
    })

    const load = () => {
      axios.get("/api/cart/items").then(({ data }) => {
        console.log(data);
        state.items = data;
      })
    }



    load();

    return { state }
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