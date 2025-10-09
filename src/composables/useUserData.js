import { ref } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

const { getDataFromLocalStorage } = useLocalStorage()

const userName = ref(getDataFromLocalStorage('userData')?.username ?? 'User');
const userAvatar = ref(getDataFromLocalStorage('userData')?.imgUrl ?? '');
const userCurrency = ref(getDataFromLocalStorage('userData')?.currency ?? 'THB');

export function useUserData() {
  return { userName, userAvatar, userCurrency}
}