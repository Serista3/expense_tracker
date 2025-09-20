import { ref } from 'vue';
import { updateDataToLocalStorage } from './initial';

const isDeleteModalVisible = ref(false);
export let transactionToDelId = null;

export const openDeleteModal = function(id) {
    transactionToDelId = id
    isDeleteModalVisible.value = true;
};

export const confirmDelTransaction = function(){
    transactions.value = transactions.value.filter(t => t.id !== transactionToDelId);
    updateDataToLocalStorage('transactions', transactions.value)
    isDeleteModalVisible.value = false;
    transactionToDelId = null
}

export const cancelData = function(router){
  router.push('/transaction')
}