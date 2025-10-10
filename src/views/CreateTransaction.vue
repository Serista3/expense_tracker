<script setup>
import TransactionForm from '@/components/transaction/TransactionForm.vue';
import TransactionPageLayout from '@/components/layout/TransactionPageLayout.vue';
import Modal from '@/components/common/Modal.vue';
import CategoryForm from '@/components/CategoryForm.vue';
import { useFormat } from '@/composables/useFormat';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useTransaction } from '@/composables/useTransaction';
import { useCategories } from '@/composables/useCategories';
import { useModalScrollLock } from '@/composables/useModalScrollLock';
import { useRouter } from 'vue-router';

const router = useRouter();
const { formattedDate } = useFormat();
const { updateDataToLocalStorage } = useLocalStorage();
const { transactions } = useTransaction();
const { categories, isCreateCategoryModalVisible, openModalCreateCategory, closeModalCreateCategory, createCategoryData } = useCategories();
useModalScrollLock(isCreateCategoryModalVisible);

const createData = function(payload){
  payload.id = !transactions.value.length ? 1 : transactions.value.at(-1).id + 1
  payload.date = formattedDate(payload.date);
  payload.description = payload.description ?? ''

  transactions.value.push({...payload})
  updateDataToLocalStorage('transactions', transactions.value)

  router.back()
}

</script>

<template>
  <TransactionPageLayout title="Create Transaction">
    <TransactionForm 
      :categoryData="categories" 
      @submitTransaction="createData" 
      @cancelTransaction="router.back()"
      @openModalCreateCategory="openModalCreateCategory"/>
    <Modal v-model="isCreateCategoryModalVisible" nameModal="Category">
      <CategoryForm @submitCategory="createCategoryData" @cancelCategory="closeModalCreateCategory" />
    </Modal>
  </TransactionPageLayout>
</template>