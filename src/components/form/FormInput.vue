<script setup>

const props = defineProps({
  type: String,
  name: String,
  placeholder: String,
})
const modelValue = defineModel()

</script>

<template>
  <input
    class="py-2 px-4 text-[1.6rem] border border-gray-300 focus:border-dark dark:border-gray-600 rounded-[.7rem] dark:focus:outline-0 dark:focus:border-gray-300 dark:bg-dark dark:text-light w-full transition-all focus:outline-0" 
    :type="props.type" 
    :id="props.name" 
    :name="props.name" 
    :placeholder="props.placeholder"
    step="any"
    v-model="modelValue">
</template>