<script setup>
import Form from '@/components/Form.vue';
import { PhCaretLeft } from '@phosphor-icons/vue';
import { useRoute, useRouter } from 'vue-router';
import { exData, exCategory } from '@/composables/initial';

const route = useRoute();
const router = useRouter();

const getEditData = function(){
  return Array.from(exData.value).filter(data => data.id === route.params.id).at(0)
}

const saveEditData = function(payload){
  console.log(payload)
}

const cancelEditData = function(){
  router.push('/transaction');
}

</script>

<template>
  <div class="edit-transaction-page py-40 px-22 flex flex-col justify-center items-center dark:text-light dark:bg-dark w-full relative">
    <h1 class="text-6xl font-semibold mb-20">Edit Transactions</h1>
    <Form @cancelTransaction="cancelEditData" @saveTransaction="saveEditData" :editData="getEditData()" :categoryData="exCategory"/>
    <router-link to="/transaction" class="absolute top-14 left-14 text-dark font-semibold hover:underline flex gap-2 items-center">
      <PhCaretLeft :size="32" weight="fill" />
      Back to transaction
    </router-link>
  </div> 
</template>