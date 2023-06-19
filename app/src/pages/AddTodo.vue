<template>
    <div class="addTodo">
        <form>
            <label for="">Title</label>
            <input type="text" v-model="title" required>
            <label for="">Description</label>
            <input type="text" v-model="description" required>

            <label for="">Finish date</label>
            <input type="date" v-model="date" required>
            <div class="checkboxLabelsDiv">
                <label for="">Labels (choose or create)</label>
                <input type="checkbox" @change="isNewLabel = !isNewLabel">
            </div>
            <v-select label="Select" v-if="!isNewLabel" v-model="label" :items="labelNames">
            </v-select>
            <input type="text" v-else placeholder="Write new label" v-model="label">
            <label for="">Status</label>
            <v-select label="Select" v-model="status" :items="['Active', 'In progress', 'Completed']"></v-select>
            <button @click.prevent="addTodoDef">Add</button>

        </form>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { todoService } from '../services/todoService';
import { useToast } from 'vue-toast-notification';
import router from '../router/router';

const $toast = useToast();

const title = ref("")
const description = ref("")
const status = ref("")
const date = ref("")
const isNewLabel = ref(false)
const labels = ref([])
const label = ref("")

onMounted(() => {
    todoService.getTodosByUser("Active").then((res) => {
        labels.value = res.labels
    })
})

const labelNames = computed(() => labels.value.map(label => label.labelName))

async function addTodoDef() {
    console.log(label)
    if (title.value === "" || description.value === "" || status.value === "" || date.value === "", label.value === 0) {
        $toast.info('All fields must be completed')
        return
    }

    const res = await todoService.addTodo(title.value, description.value, status.value, date.value, label.value);

    if (res.status === 200) {
        $toast.success('Todo added')
        title.value = "";
        description.value = "";
        status.value = "";
        date.value = "";
        label.value = "";
        router.push('/home');

    } else {
        $toast.error('Error')
    }
}

</script>

<style scoped>
.addTodo {
    width: 100%;
    height: 80%;
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
    font-size: 14px;
}


input {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 4px;
    margin-bottom: 12px;
}

button {
    padding: 8px 16px;
    background-color: var(--mainColor);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}


.checkboxLabelsDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
</style>
