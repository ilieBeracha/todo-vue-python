<template>
    <div class="feature">
        <div class="text">
            <p>{{ featureText }}</p>
        </div>
        <div class="image">
            <img :src=img alt="">
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    featureText: "",
    img: String
})

</script>

<style scoped>
.feature {
    width: 80%;
    min-height: 25%;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    flex-shrink: 0;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image img{
    width: 80px;
}
</style>