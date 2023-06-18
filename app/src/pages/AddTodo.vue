<template>
    <div class="addTodo">
        <form>
            <label for="">Title</label>
            <input type="text" v-model="title" required>
            <label for="">Description</label>
            <input type="text" v-model="description" required>
            <v-select label="Select" v-model="status" :items="['Active', 'In progress', 'Completed']"></v-select>
            <label for="">Finish date</label>
            <input type="date" v-model="date" required>
            <button @click.prevent="addTodoDef">Add</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { todoService } from '../services/todoService';

const store = useStore();

const title = ref("")
const description = ref("")
const status = ref()
const date = ref()


async function addTodoDef() {
    const userId = store.getters.getId;
    console.log(userId)
    const res = await todoService.addTodo(title.value, description.value, status.value, date.value);
    console.log(res)
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
    flex-direction: column;
    gap: 6px;
}

input {
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>