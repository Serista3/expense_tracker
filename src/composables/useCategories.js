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

// [
//   { "id": 1, "name": "Food", "color": "#ffae00" },
//   { "id": 2, "name": "Entertainment", "color": "#c800ff" },
//   { "id": 3, "name": "Transportation", "color": "#00aeff" },
//   { "id": 4, "name": "Shopping", "color": "#00d35f" },
//   { "id": 5, "name": "Utilities", "color": "#ff4e00" },
//   { "id": 6, "name": "Groceries", "color": "#00b295" },
//   { "id": 7, "name": "Health", "color": "#ff005d" },
//   { "id": 8, "name": "Education", "color": "#6e00ff" },
//   { "id": 9, "name": "Others", "color": "#8c8c8c" },
//   { "id": 10, "name": "Salary", "color": "#18a100" },
//   { "id": 11, "name": "Freelance", "color": "#007bff" },
//   { "id": 12, "name": "Investment", "color": "#f2c100" },
//   { "id": 13, "name": "Bonus", "color": "#e83e8c" },
//   { "id": 14, "name": "Gift", "color": "#fd7e14" },
//   { "id": 15, "name": "Other Income", "color": "#6c757d" }
// ]