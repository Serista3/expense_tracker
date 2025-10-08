<script setup>
import Navigation from '@/components/layout/Navigation.vue';
import Footer from '@/components/layout/Footer.vue';
import { PhList } from '@phosphor-icons/vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(() => route.path, (newPath) => {
  document.title = `Expense Tracker - ${newPath === '/' ? 'Home' : newPath.slice(1).charAt(0).toUpperCase() + newPath.slice(2)}`;
})

const toggleNav = function(event){
  const curEl = event.target.closest('svg')
  if(!curEl) return;

  const navEl = curEl.parentNode.parentNode.querySelector('.nav__sidebar')
  navEl.classList.toggle('w-[0]')
  navEl.classList.toggle('invisible')
  navEl.classList.toggle('hidden')
}

const closeNav = function(event){
  const curEl = event.target.closest('svg')
  if(!curEl) return;

  const parentNode = curEl.parentNode
  parentNode.classList.add('w-[0]', 'invisible', 'hidden')
}

</script>

<template>
  <div class="expense-tracker">
    <div class="content flex relative">
      <Navigation @closeNav="closeNav" :curPath="route.path" v-show="route.name !== 'EditTransaction' && route.name !== 'CreateTransaction'" />
      <div class="main relative w-full">
        <router-view />
        <PhList @click="toggleNav" :size="24" class="cursor-pointer absolute top-8 left-8 hover:text-highlight transition-all" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
