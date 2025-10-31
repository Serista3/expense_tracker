<script setup>
import Form from '../form/Form.vue';
</script>

<template>
  <Form class="form__filter">
    <slot></slot>
    <template #action>
      <div class="absolute"></div>
    </template>
  </Form>
</template>

<style scoped>

.form__filter {
  flex-direction: row;
  align-items: center;
}

:deep(.el-select__wrapper) {
  border-radius: 7px !important;
}

</style>
