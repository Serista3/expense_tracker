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
    class="py-2 px-4 border border-gray-300 rounded-[.7rem]" 
    :type="props.type" 
    :id="props.name" 
    :name="props.name" 
    :placeholder="props.placeholder"
    step="any"
    v-model="modelValue">
</template>