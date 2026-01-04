<script setup>
import { computed } from 'vue';

const props = defineProps({
  labelName: String,
})

const labelValue = computed(() => props.labelName.slice(0, 1).toUpperCase() + props.labelName.slice(1))

</script>

<template>
  <div class="form__group flex flex-col gap-4">
    <label :for="props.labelName" class="self-start font-semibold text-[1.6rem]">{{ labelValue }}:</label>
    <slot></slot>
  </div>
</template>