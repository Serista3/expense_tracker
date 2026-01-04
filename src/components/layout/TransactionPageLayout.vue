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
  <div class="transaction-page-layout pt-40 pb-30 px-6 tablet:px-16 laptop:px-22 flex flex-col justify-center items-center dark:text-light dark:bg-dark w-full relative">
    <h1 class="text-5xl tablet:text-6xl font-semibold mb-14 tablet:mb-16 laptop:mb-20">{{ props.title }}</h1>
    <slot></slot>
    <Button @click="router.back()" class="absolute top-14 left-0 text-dark dark:text-light font-semibold hover:underline flex gap-2 items-center">
      <PhCaretLeft class="text-[2.4rem]" weight="fill" />
      Back
    </Button>
  </div>
</template>