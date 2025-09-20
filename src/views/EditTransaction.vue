<script setup>
import TransactionForm from '@/components/transaction/TransactionForm.vue';
import TransactionPageLayout from '@/components/layout/TransactionPageLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { getDataFromLocalStorage, updateDataToLocalStorage } from '@/composables/initial';
import { cancelData } from '@/composables/Transaction';
import { computed, ref } from 'vue';

const route = useRoute();
const router = useRouter();

const transactions = ref(getDataFromLocalStorage('transactions'))
const categories = ref(getDataFromLocalStorage('categories') ?? []);

const getEditData = computed(() => Array.from(transactions.value).find(t => t.id === Number(route.params.id)))

const saveEditData = function(payload){
  const curTransactionData = getDataFromLocalStorage('transactions');
  const newUpdateData = Array.from(curTransactionData).map(t => t.id === payload.id ? t = {...payload} : t ) 

  updateDataToLocalStorage('transactions', newUpdateData)
  router.push('/transaction')
}

</script>

<template>
  <TransactionPageLayout title="Edit Transaction">
    <TransactionForm 
      @submitTransaction="saveEditData" 
      @cancelTransaction="cancelData(router)" 
      :editData="getEditData" 
      :categoryData="categories"/>
  </TransactionPageLayout>
</template>