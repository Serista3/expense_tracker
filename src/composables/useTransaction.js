import { ref } from 'vue';
import { updateDataToLocalStorage, getDataFromLocalStorage } from './initial';

export const isDeleteModalVisible = ref(false);
let transactionToDelId = null;

export const openDeleteModal = function(id) {
    transactionToDelId = id
    isDeleteModalVisible.value = true;
};

export const confirmDelTransaction = function(){
  const transactions = getDataFromLocalStorage('transactions');
  const notDeltransactions = transactions.filter(t => t.id !== transactionToDelId);
  updateDataToLocalStorage('transactions', notDeltransactions);
  isDeleteModalVisible.value = false;
  transactionToDelId = null;

  return notDeltransactions
}

export const cancelData = function(router){
  router.push('/transaction')
}