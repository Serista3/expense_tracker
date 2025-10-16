export function useLocalStorage() {
  
  // ดึงข้อมูลจาก localstorage ผ่าน key
  const getDataFromLocalStorage = function(key){
    try {
      const data = JSON.parse(localStorage.getItem(key))
      return data;
    } catch(err) {
      console.error(err.message)
    }
  }

  // บันทึกข้อมูลลง localstorage ด้วย key และ data
  const updateDataToLocalStorage = function(key, data){
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // ลบข้อมูลใน localstorage ผ่าน key
  const removeDataFromLocalStorage = function(key){
    localStorage.removeItem(key);
  }

  return { getDataFromLocalStorage, updateDataToLocalStorage, removeDataFromLocalStorage }
}