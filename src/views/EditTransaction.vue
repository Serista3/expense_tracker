<script setup>
import TransactionForm from '@/components/transaction/TransactionForm.vue';
import TransactionPageLayout from '@/components/layout/TransactionPageLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useTransaction } from '@/composables/useTransaction';
import { useCategories } from '@/composables/useCategories';
import { useFormat } from '@/composables/useFormat';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const { updateDataToLocalStorage } = useLocalStorage();
const { transactions } = useTransaction();
const { categories } = useCategories();
const { formattedDate } = useFormat();

const getEditData = computed(() => Array.from(transactions.value).find(t => t.id === Number(route.params.id)))

const saveEditData = function(payload){
  payload.date = formattedDate(payload.date)
  const newUpdateData = Array.from(transactions.value).map(t => t.id === payload.id ? t = {...payload} : t )
  
  updateDataToLocalStorage('transactions', newUpdateData)
  transactions.value = newUpdateData;
  router.back()
}

</script>

<template>
  <TransactionPageLayout title="Edit Transaction">
    <TransactionForm 
      @submitTransaction="saveEditData" 
      @cancelTransaction="router.back()" 
      :editData="getEditData" 
      :categoryData="categories"/>
  </TransactionPageLayout>
</template>