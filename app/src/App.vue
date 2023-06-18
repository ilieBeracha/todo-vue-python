<template>
  <div class="App">
    <Header />
    <router-view></router-view>
  </div>
</template>




<script setup>
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import { useStore } from 'vuex'

onMounted(()=>{
  const store = useStore();
  console.log(store.getters.getIsLogged)
})
</script>



<style scoped>
  .App{
    width: 100vw;
    height: 100vh;
  }

</style>
