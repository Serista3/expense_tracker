<script setup>
import Form from '@/components/form/Form.vue';
import FormField from '@/components/form/FormField.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormTextarea from '@/components/form/FormTextarea.vue';
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import { ref, computed } from 'vue';

const props = defineProps({
  editData: {
    type: Object,
    default: {},
  },
  categoryData: {
    type: Array,
    default: [],
  },
})

const formData = ref({...props.editData})
const category = computed(() => [...props.categoryData])
const emit = defineEmits(['submitTransaction', 'cancelTransaction', 'openModalCreateCategory'])
const errDataTransac = ref({})

// ตรวจสอบข้อมูลจาก user ก่อน submit
const validationForm = function(){
  errDataTransac.value.title = !formData.value.title || Number.parseInt(formData.value.title) 
    ? "Title must have data or title must not be number." : undefined
  errDataTransac.value.type = !formData.value.type ? "Type must be select." : undefined
  errDataTransac.value.category = !formData.value.category ? "Category must be select." : undefined
  errDataTransac.value.date = !formData.value.date ? "Date must have data." : undefined
  errDataTransac.value.amount = !formData.value.amount || formData.value.amount <= 0 
    ? "Amount must have data or amount must greater than zero." : undefined;

  return Object.values(errDataTransac.value).every(err => err === undefined);
}

const handleSubmit = function(){
  if(validationForm())
    emit('submitTransaction', formData.value)
  return;
}

const handleCancel = function(){
  emit('cancelTransaction')
}

const openModalCreateCategory = function(){
  emit('openModalCreateCategory')
}

</script>

<template>
  <Form @submit="handleSubmit" @cancel="handleCancel" :isEdit="formData.id !== undefined">
    <FormField labelName="title">
      <FormInput type="text" name="title" placeholder="enter your title." v-model="formData.title" />
      <ErrorMessage v-if="errDataTransac.title" :message="errDataTransac.title" />
    </FormField>
    <FormField labelName="type">
      <el-radio-group v-model="formData.type">
        <el-radio value="expense" size="large">Expense</el-radio>
        <el-radio value="income" size="large">Income</el-radio>
      </el-radio-group>
      <ErrorMessage v-if="errDataTransac.type" :message="errDataTransac.type" />
    </FormField>
    <FormField labelName="category" class="relative">
      <el-select v-model="formData.category" placeholder="select your category" style="width: 100%">
        <el-option
          v-for="item in category"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
      <div class="flex justify-between items-center">
        <ErrorMessage v-if="errDataTransac.category" :message="errDataTransac.category" />
        <button @click.prevent="openModalCreateCategory" v-if="!formData.id" class="create-category inline-block ml-auto font-semibold text-[1rem] tablet:text-[1.2rem] laptop:text-[1.4rem] hover:underline cursor-pointer">create your category</button>
      </div>
    </FormField>
    <FormField labelName="date">
      <el-date-picker
        v-model="formData.date"
        type="date"
        placeholder="select your day"
        size="default"
      />
      <ErrorMessage v-if="errDataTransac.date" :message="errDataTransac.date" />
    </FormField>
    <FormField labelName="amount">
      <FormInput type="number" name="amount" placeholder="enter your amount." v-model="formData.amount" />
      <ErrorMessage v-if="errDataTransac.amount" :message="errDataTransac.amount" />
    </FormField>
    <FormField labelName="description">
      <FormTextarea name="description" placeholder="enter your description." v-model="formData.description"/>
    </FormField>
  </Form>
</template>

<style scoped>

@media screen and (max-width: 480px), screen and (min-width: 480px) {
    :deep(.el-select__wrapper) {
        font-size: 1.2rem !important;
        min-height: 3.5rem !important;
    }

    .el-select__selected-item {
        font-size: 1.2rem !important;
    }

    .el-select-dropdown__item {
        font-size: 1.2rem !important;
    }

    :deep(.el-radio__label) {
        font-size: 1.2rem !important;
    }
}

@media screen and (min-width: 640px) {
    :deep(.el-select__wrapper) {
        font-size: 1.4rem !important;
        min-height: 3.75rem !important;
    }

    .el-select__selected-item {
        font-size: 1.4rem !important;
    }

    .el-select-dropdown__item {
        font-size: 1.4rem !important;
    }

    :deep(.el-radio__label) {
        font-size: 1.4rem !important;
    }
}

@media screen and (min-width: 900px) {
    :deep(.el-select__wrapper) {
        padding: .5rem 1rem !important;
        font-size: 1.6rem !important;
        min-height: 4rem !important;
    }

    .el-select__selected-item {
        font-size: 1.6rem !important;
    }

    .el-select-dropdown__item {
        font-size: 1.6rem !important;
    }

    :deep(.el-radio__label) {
        font-size: 1.6rem !important;
    }
}

</style>