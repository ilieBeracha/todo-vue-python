<template>
    <div class="register">
        <form>
            <label for="">Username</label>
            <input type="text" v-model="username" required>
            <label for="">Email</label>
            <input type="email" v-model="email" required>
            <label for="">Password</label>
            <input type="password" v-model="password" required>
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
    if(username.value==="" || email.value==="" || password.value==="") {
        $toast.info("Fill all Fields")
        return;
    }
    const res = await userService.registerUser(username.value, email.value, password.value);
    
    if (res === 0) {
        $toast.error('Error occured')
        return
    } else if(res.error){
        $toast.error(res.error)
    }else {
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


label {
    font-size: 13px;
}


input {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #ccc;
}


button {
    margin-top: 5px;
    background-color: var(--mainColor);
    color: white;
}
</style>