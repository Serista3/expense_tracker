<script setup>
import { showModal, activeModal } from '@/composables/reuse';

const props = defineProps(['className', 'btnName'])

const handleClick = () => {
  const modalButtons = ['Edit', 'Delete', 'Add'];
  
  if (modalButtons.includes(props.btnName)) {
    showModal(props.btnName);
  } else {
    activeModal.value = ''; 
  }
}
</script>

<template>
  <button 
    class="font-semibold py-2 px-8 rounded-xl cursor-pointer text-light transition-all" 
    :class="[props.className]" 
    @click.prevent="handleClick">
    {{ props.btnName }}
  </button>
</template>