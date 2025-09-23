import { ref } from 'vue';
import { useLocalStorage } from './useLocalStorage';

const { updateDataToLocalStorage, getDataFromLocalStorage } = useLocalStorage();
const transactions = ref(getDataFromLocalStorage('transactions') ?? [])

export function useTransaction(){
  const isDeleteModalVisible = ref(false);
  let transactionToDelId = null;

  const openDeleteModal = function(id) {
    transactionToDelId = id
    isDeleteModalVisible.value = true;
  };

  const confirmDelTransaction = function(){
    transactions.value = transactions.value.filter(t => t.id !== transactionToDelId);
    updateDataToLocalStorage('transactions', transactions.value);
    isDeleteModalVisible.value = false;
    transactionToDelId = null;
  }

  return { transactions, isDeleteModalVisible, openDeleteModal, confirmDelTransaction }
}