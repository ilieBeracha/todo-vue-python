<template>
    <div class="header">
        <div class="title">
            <router-link to="/">
                <!-- <img :src=Home alt=""> -->
                Home
            </router-link>
            <router-link to="/addTodo" v-if="isLogged">
                <!-- <img :src=Add alt=""> -->
                Add
            </router-link>
        </div>
        <div class="authBtns" v-if="!isLogged">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
        <div class="authBtns" v-else>
            <Menu />
        </div>
    </div>
</template>

<script setup>
import store from '../app/store';
import Menu from './Menu.vue';
import Home from '../assets/Home.png'
import Add from '../assets/Add.png'

const isLogged = store.getters.getIsLogged
const username = store.getters.getUsername;
console.log(username)

</script>

<style scoped>
.header {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 50px;
}

.title{
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
}
.authBtns {
    display: flex;
    gap: 20px;
}

.title img{
    width:  30px;
}

a{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>