<script setup>
import Form from './Form.vue'
import FormField from './FormField.vue'
import FormInput from './FormInput.vue'
import ErrorMessage from './ErrorMessage.vue'
import { ref } from 'vue'

const emit = defineEmits(['submitCategory', 'cancelCategory'])
const newCategory = ref({})
const errDataCategory = ref({})

const validationCategory = function(){
  errDataCategory.value.name = !newCategory.value.name || Number.parseInt(newCategory.value.name) 
    ? "Category must have data or Category must not be number." : undefined
  errDataCategory.value.color = !newCategory.value.color  ? "Category color must have data" : undefined
  
  return Object.values(errDataCategory.value).every(err => err === undefined);
}

const handleSubmit = function(){
  if(validationCategory())
    emit('submitCategory', newCategory.value)

  return 
}

const handleCancel = function(){
  emit('cancelCategory')
}

</script>

<template>
  <Form @submit="handleSubmit" @cancel="handleCancel">
    <FormField labelName="Name">
      <FormInput type="text" name="categoryName" placeholder="enter your category name." v-model="newCategory.name" />
      <ErrorMessage v-if="errDataCategory.name" :message="errDataCategory.name" />
    </FormField>
    <FormField labelName="Color">
      <el-color-picker v-model="newCategory.color" />
      <ErrorMessage v-if="errDataCategory.color" :message="errDataCategory.color" />
    </FormField>
  </Form>
</template>