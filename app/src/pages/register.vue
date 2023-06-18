<template>
    <div class="register">
        <form>
            <label for="">Username</label>
            <input type="text" v-model="username">
            <label for="">Email</label>
            <input type="email" v-model="email">
            <label for="">Password</label>
            <input type="password" v-model="password">
            <button @click.prevent="registerForm">Register</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { userService } from '../services/userService';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const username = ref("")
const email = ref("")
const password = ref("")
const store = useStore();


async function registerForm() {
    const res = await userService.registerUser(username.value, email.value, password.value);
    if (res === 0) {
        $toast.error('Error occured')
        return
    } else {
        store.dispatch("saveToken", res);
        location.reload()
    }
}

</script>

<style  scoped>
.register {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
}

form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 70%;
}

input {
    width: 100%;
    padding: 6px;
    border-radius: 10px;
    border: 1px solid #ccc;
}


button {
    background-color: var(--mainColor);
    color: white;
}
</style>