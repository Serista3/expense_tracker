const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function useFormat() {
  const formattedDate = function(newDate){
    const date = new Date(newDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const formattedDateToRead = function(newDate){
    const date = new Date(newDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return `${day} ${months[month]}, ${year}`;
  }
  return { formattedDate, formattedDateToRead }
}
