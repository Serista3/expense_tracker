<script setup>
import TransactionForm from '@/components/transaction/TransactionForm.vue';
import TransactionPageLayout from '@/components/layout/TransactionPageLayout.vue';
import { activeModal, formattedDate } from '@/composables/reuse';
import { getDataFromLocalStorage, updateDataToLocalStorage } from '@/composables/initial';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ref(getDataFromLocalStorage('categories') ?? []);

const createData = function(payload){
  const transations = getDataFromLocalStorage('transactions') ?? []
  payload.id = transations == [] ? 1 : transations.length + 1
  payload.date = formattedDate(payload.date);
  payload.description = payload.description ? payload.description  : ''

  transations.push({...payload})
  updateDataToLocalStorage('transactions', transations)

  router.push('/transaction')
}

const cancelData = function(){
  router.push('/transaction')
}

const createCategoryData = function(payload){
  payload.id = categories.value == [] ? 1 : categories.value.length + 1;
  payload.name = String(payload.name).slice(0, 1).toUpperCase() + String(payload.name).slice(1)

  categories.value.push({...payload})
  updateDataToLocalStorage('categories', categories.value)

  activeModal.value = false;
}

const cancelCategoryData = function(){
  activeModal.value = false;
}

</script>

<template>
  <TransactionPageLayout title="Create Transaction">
    <TransactionForm 
      :categoryData="categories" 
      @submitTransaction="createData" 
      @cancelTransaction="cancelData" 
      @submitCategory="createCategoryData" 
      @cancelCategory="cancelCategoryData" />
  </TransactionPageLayout>
</template>