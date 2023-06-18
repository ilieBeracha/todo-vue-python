<template>
    <div class="login">
        <form>
            <label for="">Email</label>
            <input type="email" v-model="email">
            <label for="">Password</label>
            <input type="password" v-model="password">
            <button @click.prevent="loginForm">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { userService } from '../services/userService'
import { useStore } from 'vuex';

const store = useStore();
const email = ref("")
const password = ref("")

async function loginForm() {
    const res = await userService.loginUser(email.value, password.value);
    console.log(res)
    if (res === 0 || res === undefined || res === null) {
        alert("no")
        return

    } else {
        store.dispatch("saveToken", res);
        location.reload()
    }
}
</script>

<style  scoped>
.login {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
}

form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

input {
    width: 100%;
    padding: 8px;
    border-radius: 10px;
    border: 1px solid #ccc;
}
</style>