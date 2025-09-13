<script setup>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(() => route.path, (newPath) => {
  document.title = `Expense Tracker - ${newPath === '/' ? 'Home' : newPath.slice(1).charAt(0).toUpperCase() + newPath.slice(2)}`;
})

</script>

<template>
  <div class="expense-tracker">
    <div class="content flex">
      <Navigation :curPath="route.path" />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
