<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
  name: String,
  placeholder: String,
  min: Number,
})

const labelValue = computed(() => {
  return props.name.slice(0, 1).toUpperCase() + props.name.slice(1);
})

</script>

<template>
  <div class="form__group flex flex-col gap-4">
    <label 
      :for="props.name" 
      class="inline-block font-semibold">
      {{ labelValue }}:
    </label>
    <input v-if="props.type !== 'textarea'"
      class="py-2 px-4 border border-gray-300 rounded-[.5rem]" 
      :type="props.type" 
      :id="props.name" 
      :name="props.name" 
      :placeholder="props.placeholder"
      :min="props.min">
    <textarea v-else
        class="py-2 px-4 border border-gray-300 rounded-[.5rem]" 
        :name="props.name" 
        :id="props.name" 
        :placeholder="props.placeholder"></textarea>
  </div>
</template>