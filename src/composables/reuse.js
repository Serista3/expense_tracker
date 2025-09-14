import { ref } from 'vue';

export const activeModal = ref('');

export const showModal = function(btnName) {
  activeModal.value = btnName;
};

export const closeModal = function(event) {
  const curEl = event.target.closest('.modal')
  activeModal.value = !curEl ? '' : activeModal.value;
}