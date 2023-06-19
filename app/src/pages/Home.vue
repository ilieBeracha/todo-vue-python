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
          <div class="labelBtnDiv">
            <button @click="filterByLabel(label)" class="labelBtn" v-for="label in labels">{{ label.labelName }}</button>
            <button class="clearFiltersBtn" @click="clearFilters" v-if="selectedLabel">X Clear</button>
          </div>
          <Todo :id="todo.id" :key="todo.id" v-for="todo in todos" :title="todo.title" :description="todo.description"
            :status="todo.status" :date="todo.date" @delete="deleteTodo" />
        </v-container>
      </v-window-item>
      <v-window-item :value="'In progress'">
        <v-container fluid>
          <div class="labelBtnDiv">
            <button @click="filterByLabel(label)" class="labelBtn" v-for="label in labels">{{ label.labelName }}</button>
            <button class="clearFiltersBtn" @click="clearFilters" v-if="selectedLabel">X Clear</button>
          </div>
          <Todo :id="todo.id" :key="todo.id" v-for="todo in todos" :title="todo.title" :description="todo.description"
            :status="todo.status" :date="todo.date" @delete="deleteTodo" />
        </v-container>
      </v-window-item>
      <v-window-item :value="'Completed'">
        <v-container fluid>
          <div class="labelBtnDiv">
            <button @click="filterByLabel(label)" class="labelBtn" v-for="label in labels">{{ label.labelName }}</button>
            <button class="clearFiltersBtn" @click="clearFilters" v-if="selectedLabel">X Clear</button>
          </div>
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

const originalTodos = ref([]);
const todos = ref([]);
const tab = ref('Active');
const labels = ref([]);
const selectedLabel = ref(0)

function deleteTodo(id) {
  todoService.deleteTodo(id).then(() => {
    fetchTodosByTab(tab.value);
  });
}

function filterByLabel(label) {
  selectedLabel.value = label.id
  todos.value = originalTodos.value.filter((todo) => todo.labelId === selectedLabel.value)
}

function fetchTodosByTab(tab) {
  todoService.getTodosByUser(tab).then((res) => {
    originalTodos.value = res.todos;
    todos.value = [...originalTodos.value];
    labels.value = res.labels
  });
}

function clearFilters() {
  todos.value = [...originalTodos.value];
  selectedLabel.value = 0;
}

watch(tab, (newTab) => {
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
  min-height: 90vh;
}

.labelBtnDiv {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
}

.labelBtn {
  width: max-content;
  height: max-content;
  font-size: 12px;
  border: 1px solid var(--mainColor);
}


.clearFiltersBtn {
  font-size: 12px;
  background-color: var(--mainColor);
  color: white;
}


.v-tabs--density-default {
  background-color: lightblue;
}
</style>
