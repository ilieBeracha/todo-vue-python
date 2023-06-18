<template>
  <v-card>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab class="tab" value="Active">Active</v-tab>
      <v-tab class="tab" value="In progress">In progress</v-tab>
      <v-tab class="tab" value="Completed">Completed</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="'Active'">
        <v-container fluid>
          <Todo :id="todo.id" :key="todo.id" v-for="todo in todos" :title="todo.title" :description="todo.description"
            :status="todo.status" :date="todo.date" @delete="deleteTodo" />
        </v-container>
      </v-window-item>
      <v-window-item :value="'In progress'">
        <v-container fluid>
          <Todo :id="todo.id" :key="todo.id" v-for="todo in todos" :title="todo.title" :description="todo.description"
            :status="todo.status" :date="todo.date" @delete="deleteTodo" />
        </v-container>
      </v-window-item>
      <v-window-item :value="'Completed'">
        <v-container fluid>
          <Todo :id="todo.id" :key="todo.id" v-for="todo in todos" :title="todo.title" :description="todo.description"
            :status="todo.status" :date="todo.date" @delete="deleteTodo" />
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { todoService } from '../services/todoService';
import Todo from '../components/Todo.vue';

const todos = ref([]);
const tab = ref('Active');

function deleteTodo(id) {
  console.log(id);
  todoService.deleteTodo(id).then(() => {
    fetchTodosByTab(tab.value);
  });
}

function fetchTodosByTab(tab) {
  todoService.getTodosByUser(tab).then((res) => {
    todos.value = res;
  });
}

watch(tab, (newTab) => {
  console.log(newTab);
  fetchTodosByTab(newTab);
});

onMounted(() => {
  fetchTodosByTab(tab.value);
});
</script>

<style scoped>
.tab {
  font-size: 10px;
}

.v-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 85vh;
}
</style>
