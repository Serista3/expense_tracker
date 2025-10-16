import { ref, watch } from 'vue';
import { useLocalStorage } from './useLocalStorage';

const { updateDataToLocalStorage, getDataFromLocalStorage } = useLocalStorage();
const transactions = ref(getDataFromLocalStorage('transactions') ?? [])

export function useTransaction(){
  const isDeleteModalVisible = ref(false);
  const transactionToDel = ref(null);

  const openDeleteModal = function(transaction) {
    transactionToDel.value = transaction
    isDeleteModalVisible.value = true;
  };

  const confirmDelTransaction = function(){
    transactions.value = transactions.value.filter(t => t.id !== transactionToDel.value.id);
    updateDataToLocalStorage('transactions', transactions.value);
    isDeleteModalVisible.value = false;
  }

  watch(isDeleteModalVisible, (newVal) => {
    if(!newVal) 
      transactionToDel.value = null;
  })

  return { transactions, isDeleteModalVisible, openDeleteModal, confirmDelTransaction, transactionToDel }
}