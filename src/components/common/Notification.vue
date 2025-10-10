<script setup>

const props = defineProps({
  message: {
    type: String,
    default: 'success',
  }
})

</script>

<template>
  <div class="notification py-4 px-8 rounded-[.7rem] text-white transition-all z-8">{{ message }}</div>
</template>