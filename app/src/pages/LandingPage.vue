<template>
    <div class="landingPage">
        <div class="welcome">
            <!-- <h3>Todo List</h3> -->
            <img :src="todoPng" alt="">
        </div>
        <div class="features">
            <Feature v-for="feat in features" :key="feat" :featureText="feat" />
        </div>
    </div>
</template>

<script setup>
import todoPng from '../assets/todo.png'
import Feature from '../components/Feature.vue';

const features = [
    "Effortlessly manage your daily tasks with our intuitive interface.",
    "Set custom due dates for each task and never miss a deadline.",
    "Sync your todo list across all your devices in real-time."
];
</script>

<style scoped>
.landingPage {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 10px;
}

.landingPage img {
    width: 300px;
}

.welcome {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.features {
    width: 100%;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
</style>