<template>
    <div class="header">
        <div class="title">
            <router-link to="/">
                <!-- <img :src=Home alt=""> -->
                Home
            </router-link>
            <router-link to="/addTodo" v-if="isLogged">
                <!-- <img :src=Home alt=""> -->
                Add
            </router-link>
        </div>
        <div class="authBtns" v-if="!isLogged">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
        <div class="authBtns" v-else>
            <Menu />
            <!-- <SideMenu /> -->
        </div>
    </div>
</template>

<script setup>
import store from '../app/store';
import Menu from './Menu.vue';
import SideMenu from './SideMenu.vue';
const isLogged = store.getters.getIsLogged

</script>

<style scoped>
.header {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
}

.title {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.authBtns {
    display: flex;
    gap: 20px;
}

.title img {
    width: 30px;
}

a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>