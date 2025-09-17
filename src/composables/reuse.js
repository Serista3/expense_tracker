import { ref } from 'vue';

export const activeModal = ref(false);

export const showModal = function() {
  activeModal.value = true;
};

export const closeModal = function(event) {
  const curEl = event.target.closest('.modal')
  activeModal.value = !curEl ? '' : activeModal.value;
}

export const formattedDate = function(newDate){
  const date = new Date(newDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
