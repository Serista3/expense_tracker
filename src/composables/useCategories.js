import { ref, watch } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import { useTransaction } from './useTransaction'

const { getDataFromLocalStorage, updateDataToLocalStorage } = useLocalStorage()
const categories = ref(getDataFromLocalStorage('categories') ?? [])
const { transactions } = useTransaction()

export function useCategories() {
  const isCreateCategoryModalVisible = ref(false);
  const isDeleteCategoryModalVisible = ref(false);
  const editCategoryData = ref(null)
  const delCategoryData = ref(null)

  const openModalCreateCategory = function(editData = null){
    isCreateCategoryModalVisible.value = true
    editCategoryData.value = editData;
  }

  const closeModalCreateCategory = function(){
    isCreateCategoryModalVisible.value = false
  }

  watch(isCreateCategoryModalVisible, (newVal) => {
    if(!newVal) 
      editCategoryData.value = null;
  })

  const createCategoryData = function(payload){
    payload.id = categories.value == [] ? 1 : categories.value.length + 1;
    payload.name = String(payload.name).slice(0, 1).toUpperCase() + String(payload.name).slice(1)

    categories.value.push({...payload})
    updateDataToLocalStorage('categories', categories.value)

    closeModalCreateCategory()
  }

  const updateCategoryData = function(payload){
    const index = categories.value.findIndex(c => c.id === payload.id);
    if(index !== -1){
      categories.value[index] = {...payload}

      transactions.value = transactions.value.map(t => {
        if(t.category === editCategoryData.value.name){
          t.category = payload.name;
        }
        return t;
      })

      updateDataToLocalStorage('categories', categories.value)
      updateDataToLocalStorage('transactions', transactions.value)

      closeModalCreateCategory()
    }
  }

  watch(isDeleteCategoryModalVisible, (newVal) => {
    if(!newVal) 
      delCategoryData.value = null;
  })

  const deleteCategoryData = function(){
    categories.value = categories.value.filter(c => c.id !== delCategoryData.value.id)

    if(categories.value.findIndex(c => c.name === 'Uncategorized') === -1)
      categories.value.push({ id: categories.value.length + 1, name: 'Uncategorized', color: '#212121' })

    transactions.value = transactions.value.map(t => {
      if(t.category === delCategoryData.value.name){
        t.category = 'Uncategorized';
      }
      return t;
    })

    updateDataToLocalStorage('categories', categories.value)
    updateDataToLocalStorage('transactions', transactions.value);

    isDeleteCategoryModalVisible.value = false;
  }

  return {  
            categories, 
            isCreateCategoryModalVisible,
            isDeleteCategoryModalVisible,
            editCategoryData,
            delCategoryData,
            openModalCreateCategory, 
            closeModalCreateCategory, 
            createCategoryData,
            updateCategoryData,
            deleteCategoryData,
          };
}