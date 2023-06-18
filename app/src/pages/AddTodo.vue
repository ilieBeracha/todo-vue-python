<template>
    <div class="addTodo">
        <form>
            <label for="">Title</label>
            <input type="text" v-model="title" required>
            <label for="">Description</label>
            <input type="text" v-model="description" required>
            <label for="">Status</label>
            <v-select label="Select" v-model="status" :items="['Active', 'In progress', 'Completed']"></v-select>
            <label for="">Finish date</label>
            <input type="date" v-model="date" required>
            <button @click.prevent="addTodoDef">Add</button>

        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { todoService } from '../services/todoService';
import { useToast } from 'vue-toast-notification';
const $toast = useToast();

const title = ref("")
const description = ref("")
const status = ref("")
const date = ref("")


async function addTodoDef() {
    if (title.value === "" || description.value === "" || status.value === "" || date.value === "") {
        $toast.info('All fields must be completed')
        return
    }

    const res = await todoService.addTodo(title.value, description.value, status.value, date.value);

    if (res.status === 200) {
        $toast.success('Todo added')
        title.value = "";
        description.value = "";
        status.value= "";
        date.value= "";
    } else {
        $toast.error('Error')
    }
}

</script>

<style scoped>
.addTodo {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    display: flex;
    width: 70%;
    flex-direction: column;
    gap: 6px;
    margin: 0 auto;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="date"] {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 6px;
}

button {
    padding: 8px 16px;
    background-color: var(--mainColor);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
</style>
