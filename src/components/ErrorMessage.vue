<script setup>

const props = defineProps({
  message: {
    type: String,
    default: '',
  }
})

</script>

<template>
  <div class="error-mesg text-alert text-[1.4rem]">{{ props.message }}</div>
</template>