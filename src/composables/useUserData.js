import { ref } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

const { getDataFromLocalStorage, updateDataToLocalStorage } = useLocalStorage()

const userName = ref(getDataFromLocalStorage('userData')?.username ?? 'User');
const userAvatar = ref(getDataFromLocalStorage('userData')?.imgUrl ?? '');
const userBudgets = ref(getDataFromLocalStorage('userData')?.budgets ?? []);

export function useUserData() {

  // บันทึกข้อมูล user ลง LocalStorage
  const saveUserData = function(userData){
    userName.value = userData.username;
    userAvatar.value = userData.imgUrl;
    userBudgets.value = userData.budgets;

    const updatedUserData = { 
      'username': userData.username,
      'imgUrl': userData.imgUrl,
      'budgets': userData.budgets
    };
    updateDataToLocalStorage('userData', updatedUserData)
  }

  return { userName, userAvatar, userBudgets, saveUserData }
}