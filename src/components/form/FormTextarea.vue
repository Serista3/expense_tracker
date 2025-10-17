<script setup>

const props = defineProps({
  name: String,
  placeholder: String,
})
const modelValue = defineModel()

</script>

<template>
  <textarea
    class="py-2 px-4 border border-gray-300 rounded-[.5rem] focus:border-dark dark:border-gray-600 dark:focus:outline-0 dark:focus:border-gray-300 dark:bg-dark dark:text-light w-full transition-all focus:outline-0" 
    :name="props.name" 
    :id="props.name" 
    :placeholder="props.placeholder"
    v-model="modelValue"></textarea>
</template>