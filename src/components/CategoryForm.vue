<script setup>
import Form from '@/components/form/Form.vue'
import FormField from '@/components/form/FormField.vue'
import FormInput from '@/components/form/FormInput.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import { ref } from 'vue'
import { useCategories } from '@/composables/useCategories'

const props = defineProps({
  editData: {
    type: Object,
    default: null,
  }
})

const { categories } = useCategories()
const emit = defineEmits(['submitCategory', 'cancelCategory'])
const formCategoryData = ref({ ...props.editData } || {})
const errDataCategory = ref({})

// ตรวจสอบข้อมูลจาก user ก่อน submit
const validationCategory = function(){
  errDataCategory.value.name = !formCategoryData.value.name || Number.parseInt(formCategoryData.value.name) 
    ? "Category must have data or Category must not be number." : undefined
  errDataCategory.value.name = categories.value.some(c => c.name.toLowerCase() === formCategoryData.value.name.toLowerCase() && c.id !== formCategoryData.value.id) 
    ? "Category name already exists." : undefined
  errDataCategory.value.color = !formCategoryData.value.color  ? "Category color must have data" : undefined
  
  return Object.values(errDataCategory.value).every(err => err === undefined);
}

const handleSubmit = function(){
  if(validationCategory())
    emit('submitCategory', formCategoryData.value)

  return 
}

const handleCancel = function(){
  emit('cancelCategory')
}

</script>

<template>
  <Form @submit="handleSubmit" @cancel="handleCancel" :isEdit="Boolean(editData?.id)" >
    <FormField labelName="Name">
      <FormInput type="text" name="categoryName" placeholder="enter your category name." v-model="formCategoryData.name" />
      <ErrorMessage v-if="errDataCategory.name" :message="errDataCategory.name" />
    </FormField>
    <FormField labelName="Color">
      <el-color-picker v-model="formCategoryData.color" />
      <ErrorMessage v-if="errDataCategory.color" :message="errDataCategory.color" />
    </FormField>
  </Form>
</template>