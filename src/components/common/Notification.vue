<script setup>

const props = defineProps({
  message: {
    type: String,
    default: 'success',
  }
})

</script>

<template>
  <div class="notification py-4 px-4 tablet:px-6 laptop:px-8 text-[1.4rem] tablet:text-[1.6rem] rounded-[.7rem] text-white transition-all z-8">{{ message }}</div>
</template>