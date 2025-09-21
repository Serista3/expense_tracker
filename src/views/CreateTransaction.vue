<script setup>
import TransactionForm from '@/components/transaction/TransactionForm.vue';
import TransactionPageLayout from '@/components/layout/TransactionPageLayout.vue';
import Modal from '@/components/common/Modal.vue';
import CategoryForm from '@/components/CategoryForm.vue';
import { formattedDate } from '@/composables/reuse';
import { cancelData } from '@/composables/useTransaction';
import { getDataFromLocalStorage, updateDataToLocalStorage } from '@/composables/initial';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ref(getDataFromLocalStorage('categories') ?? []);
const isCreateCategoryModalVisible = ref(false);

const createData = function(payload){
  const transations = getDataFromLocalStorage('transactions') ?? []
  payload.id = transations == [] ? 1 : transations.length + 1
  payload.date = formattedDate(payload.date);
  payload.description = payload.description ? payload.description  : ''

  transations.push({...payload})
  updateDataToLocalStorage('transactions', transations)

  router.push('/transaction')
}

const openModalCreateCategory = function(){
  isCreateCategoryModalVisible.value = true
}

const closeModalCreateCategory = function(){
  isCreateCategoryModalVisible.value = false
}

const createCategoryData = function(payload){
  payload.id = categories.value == [] ? 1 : categories.value.length + 1;
  payload.name = String(payload.name).slice(0, 1).toUpperCase() + String(payload.name).slice(1)

  categories.value.push({...payload})
  updateDataToLocalStorage('categories', categories.value)

  closeModalCreateCategory()
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