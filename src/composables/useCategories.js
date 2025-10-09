import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

const { getDataFromLocalStorage, updateDataToLocalStorage } = useLocalStorage()
const categories = ref(getDataFromLocalStorage('categories') ?? [])

export function useCategories() {
  const isCreateCategoryModalVisible = ref(false);

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

  return {  
            categories, 
            isCreateCategoryModalVisible,
            openModalCreateCategory, 
            closeModalCreateCategory, 
            createCategoryData 
          };
}