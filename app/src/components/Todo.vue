<template>
    <div class="todo">
        <p class="todo-title">{{ title }}</p>
        <p class="todo-description">{{ description }}</p>
        <p class="todo-status">{{ status }}</p>
        <p class="todo-date">{{ formattedDate }}</p>
        <button @click="deleteTodo">X</button>
    </div>
</template>
  
<script setup>
import { computed } from 'vue';

const emit = defineEmits(['delete'])
const props = defineProps({
    title: "",
    description: "",
    status: "",
    date: "",
    id: 0
});

function deleteTodo() {
    emit('delete', props.id)
}

const formattedDate = computed(() => {
    const originalDate = props.date;
    const formatted = new Date(originalDate).toISOString().split('T')[0].split('-').slice(1).join('-');
    return formatted;
});
</script>
  
<style scoped>
.todo {
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
    position: relative;
    border: 1px solid #6101EA;

}

.todo-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
}

.todo-description {
    font-size: 14px;
    margin-bottom: 8px;
}

.todo-status {
    font-size: 14px;
    margin-bottom: 8px;
}

.todo-date {
    font-size: 14px;
    color: #888888;
}

button {
    position: absolute;
    top: 5px;
    right: 5px;
}
</style>
  