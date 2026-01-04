<script setup>

const props = defineProps({
  message: {
    type: String,
    default: '',
  }
})

</script>

<template>
  <div class="error-mesg text-alert text-[1.4rem] tablet:text-[1.6rem]">{{ props.message }}</div>
</template>