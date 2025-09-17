<script setup>

const props = defineProps({
  name: String,
  placeholder: String,
})
const modelValue = defineModel()

</script>

<template>
  <textarea
    class="py-2 px-4 border border-gray-300 rounded-[.5rem]" 
    :name="props.name" 
    :id="props.name" 
    :placeholder="props.placeholder"
    v-model="modelValue"></textarea>
</template>