import { ref } from "vue";
import { useLocalStorage } from "./useLocalStorage";

const { getDataFromLocalStorage, updateDataToLocalStorage} = useLocalStorage()
const curTheme = ref('');

export function useTheme() {

    // เปลี่ยน theme จาก dark -> light or light -> dark
    const changeTheme = function() {
        document.documentElement.classList.remove(curTheme.value === 'dark' ? 'dark' : 'light');
        curTheme.value = curTheme.value === 'dark' ? 'light' : 'dark';
        document.documentElement.classList.add(curTheme.value);

        updateDataToLocalStorage('theme', curTheme.value);
    }

    // ให้ theme คงอยู่เมื่อ render page ใหม่
    const getTheme = function() {
        curTheme.value = getDataFromLocalStorage('theme');
        document.documentElement.classList.add(curTheme.value || 'light');
    }

    return { curTheme, changeTheme, getTheme };
}