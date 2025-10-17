<script setup>
import { PhCaretLeft } from '@phosphor-icons/vue';
import Button from '../common/Button.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String,
})
const router = useRouter();

</script>

<template>
  <div class="transaction-page-layout py-40 px-22 flex flex-col justify-center items-center dark:text-light dark:bg-dark w-full relative">
    <h1 class="text-6xl font-semibold mb-20">{{ props.title }}</h1>
    <slot></slot>
    <Button @click="router.back()" class="absolute top-14 left-14 text-dark dark:text-light font-semibold hover:underline flex gap-2 items-center">
      <PhCaretLeft :size="24" weight="fill" />
      Back
    </Button>
  </div>
</template>