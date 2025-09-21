<script setup>
import TransactionForm from '@/components/transaction/TransactionForm.vue';
import TransactionPageLayout from '@/components/layout/TransactionPageLayout.vue';
import Modal from '@/components/common/Modal.vue';
import CategoryForm from '@/components/CategoryForm.vue';
import { useFormat } from '@/composables/useFormat';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useCategories } from '@/composables/useCategories';
import { cancelData } from '@/composables/useTransaction';
import { useRouter } from 'vue-router';

const router = useRouter();
const { formattedDate } = useFormat();
const { getDataFromLocalStorage, updateDataToLocalStorage } = useLocalStorage();
const { categories, isCreateCategoryModalVisible, openModalCreateCategory, closeModalCreateCategory, createCategoryData } = useCategories();

const createData = function(payload){
  const transations = getDataFromLocalStorage('transactions') ?? []
  payload.id = transations == [] ? 1 : transations.at(-1).id + 1
  payload.date = formattedDate(payload.date);
  payload.description = payload.description ?? ''

  transations.push({...payload})
  updateDataToLocalStorage('transactions', transations)

  router.push('/transaction')
}

</script>

<template>
  <TransactionPageLayout title="Create Transaction">
    <TransactionForm 
      :categoryData="categories" 
      @submitTransaction="createData" 
      @cancelTransaction="cancelData(router)"
      @openModalCreateCategory="openModalCreateCategory"/>
    <Modal v-model="isCreateCategoryModalVisible" nameModal="Category">
      <CategoryForm @submitCategory="createCategoryData" @cancelCategory="closeModalCreateCategory" />
    </Modal>
  </TransactionPageLayout>
</template>