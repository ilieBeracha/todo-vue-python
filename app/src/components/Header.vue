<template>
    <div class="header">
        <div class="title">
            <router-link to="/">Home</router-link>
            <router-link to="/addTodo" v-if="isLogged">Add</router-link>
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
}
.authBtns {
    display: flex;
    gap: 20px;
}
</style>