<script setup>
import Navigation from '@/components/layout/Navigation.vue';
import Footer from '@/components/layout/Footer.vue';
import { PhList } from '@phosphor-icons/vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToggleWithScrollLock } from './composables/useToggleWithScrollLock';

const route = useRoute();
const { isNav, openNav, closeNav } = useToggleWithScrollLock()

// เปลี่ยน title page ตาม path
watch(() => route.path, (newPath) => {
  document.title = `Expense Tracker - ${newPath === '/' ? 'Home' : newPath.slice(1).charAt(0).toUpperCase() + newPath.slice(2)}`;
})

</script>

<template>
  <div class="expense-tracker">
    <div class="content flex relative">
      <Navigation :activeNav="isNav" @closeNav="closeNav" :curPath="route.path" v-show="route.name !== 'EditTransaction' && route.name !== 'CreateTransaction'" />
      <div class="main relative w-full bg-light dark:bg-dark">
        <router-view />
        <PhList 
          @click="openNav" 
          :size="24" 
          class="menu-nav cursor-pointer absolute top-8 left-8 text-dark dark:text-light hover:text-highlight transition-all" 
          :class="{'cursor-pointer': !isNav}"
          v-show="route.name !== 'EditTransaction' && route.name !== 'CreateTransaction'" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
