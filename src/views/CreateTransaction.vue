<script setup>
import { exCategory } from '@/composables/initial';
import Form from '@/components/Form.vue';
import { PhCaretLeft } from '@phosphor-icons/vue';

const createData = function(payload){
  console.log(payload)
}

</script>

<template>
  <div class="creaete-transaction-page py-40 px-22 flex flex-col justify-center items-center dark:text-light dark:bg-dark w-full">
    <h1 class="text-6xl font-semibold mb-20">Create Transactions</h1>
    <Form :categoryData="exCategory" @createTransaction="createData" />
    <router-link to="/transaction" class="absolute top-14 left-14 text-dark font-semibold hover:underline flex gap-2 items-center">
      <PhCaretLeft :size="32" weight="fill" />
      Back to transaction
    </router-link>
  </div> 
</template>