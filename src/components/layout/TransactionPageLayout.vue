<script setup>
import { PhCaretLeft } from '@phosphor-icons/vue';

const props = defineProps({
  title: String,
})

</script>

<template>
  <div class="transaction-page-layout py-40 px-22 flex flex-col justify-center items-center dark:text-light dark:bg-dark w-full relative">
    <h1 class="text-6xl font-semibold mb-20">{{ props.title }}</h1>
    <slot></slot>
    <router-link to="/transaction" class="absolute top-14 left-14 text-dark font-semibold hover:underline flex gap-2 items-center">
      <PhCaretLeft :size="32" weight="fill" />
      Back to transaction
    </router-link>
  </div>
</template>