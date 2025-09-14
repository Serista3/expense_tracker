<script setup>

const props = defineProps(['className', 'btnName'])

</script>

<template>
  <button 
    class="font-semibold py-2 px-8 rounded-xl cursor-pointer text-light transition-all" 
    :class="[props.className]" >
    {{ props.btnName }}
  </button>
</template>