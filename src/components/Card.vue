<template>
    <div class="card shadow-sm">
        <img class="img-style" :src="item.imgPath" alt="">
        <div class="card-body">
        <p class="card-text">{{ item.name }}</p>
        <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-primary">구입하기</button>
            <small class="text-muted">{{ item.price }} 원</small>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "Card",
    props:{
        item : Object
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


</style>