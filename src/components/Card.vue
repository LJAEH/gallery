<template>
    <div class="card shadow-sm">
        <img class="img-style" :src="item.imgPath" alt="">
        <div class="card-body">
            <div>
                <span class="card-text">{{ item.name }}</span>            
                <span class="discount badge bg-danger" style="margin-left: 10px;">
                    {{ numberFormatter(item.discountPer) }}%
                </span>
            </div>
        <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-primary" @click="addToCart(item.id)">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
            <small class="price text-muted">
                {{ numberFormatter(item.price) }}원 
            </small>

            <span class="real text-danger">
                {{ numberFormatter(item.price-(item.price*item.discountPer/100)) }}원 
            </span>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    name : "Card",
    props:{
        item : Object
    },
    methods: {
        numberFormatter(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    setup(){
        const addToCart = (itemId) => {
            axios.post(`/api/cart/items/${itemId}`).then(() => {
                console.log('success');
            })
        };
        return {addToCart}
    }
}

</script>

<style scoped>
.card .img {
    display : inline-block;
    width : 100%;
    height : 250px;
    background-size: cover;
    background-position: center;
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 위아래 여백을 동일하게 분배 */
    height: 100%; /* 부모 요소의 높이를 100%로 설정하여 여백이 적용될 수 있도록 함 */
}

.img-style {
    display: block;
    width: 100%;
    height: 250px; /* 최대 높이 설정 */
    object-fit: cover; /* 이미지 비율 유지 */
}

.card .card-body .price {
    text-decoration: line-through;
}


.discount {

}


</style>