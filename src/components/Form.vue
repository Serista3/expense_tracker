<script setup>
import FormField from './FormField.vue';
import FormInput from './FormInput.vue';
import FormTextarea from './FormTextarea.vue';
import Button from './Button.vue';
import ErrorMessage from './ErrorMessage.vue';
import { ref } from 'vue';

const props = defineProps({
  editData: {
    type: Object,
    default: {},
  },
  categoryData: {
    type: Array,
    require: true,
  },
})
const formData = ref({...props.editData})
const category = ref({...props.categoryData})
const emit = defineEmits(['saveTransaction', 'cancelTransaction', 'createTransaction'])
const errorData = ref({})

const validationForm = function(){
  errorData.value.title = !formData.value.title || formData.value.title === '' || Number.parseInt(formData.value.title) 
    ? "Title must have data or title must not be number." : undefined
  errorData.value.type = !formData.value.type ? "Type must be select." : undefined
  errorData.value.category = !formData.value.category ? "Category must be select." : undefined
  errorData.value.date = !formData.value.date ? "Date must have data." : undefined
  errorData.value.amount = !formData.value.amount || formData.value.amount <= 0 
    ? "Amount must have data or amount must greater than zero." : undefined;

  return Object.entries(errorData.value).filter(v => v.at(-1) !== undefined).length === 0 ? true : false;
}

const manageTransaction = function(emitName){
  if(validationForm())
    emit(emitName, formData.value)

  return;
}

</script>

<template>
  <form class="form flex flex-col gap-8 max-w-[50rem] w-full">
    <FormField labelName="title">
      <FormInput type="text" name="title" placeholder="enter your title." v-model="formData.title" />
      <ErrorMessage v-if="errorData.title" :message="errorData.title" />
    </FormField>
    <FormField labelName="type">
      <el-radio-group v-model="formData.type">
        <el-radio value="expense" size="large">Expense</el-radio>
        <el-radio value="income" size="large">Income</el-radio>
      </el-radio-group>
      <ErrorMessage v-if="errorData.type" :message="errorData.type" />
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
        <ErrorMessage v-if="errorData.category" :message="errorData.category" />
        <button @click.prevent="" v-if="!formData.id" class="create-category inline-block ml-auto font-semibold text-[1.4rem] hover:underline cursor-pointer">create your category</button>
      </div>
    </FormField>
    <FormField labelName="date">
      <el-date-picker
        v-model="formData.date"
        type="date"
        placeholder="select your day"
        size="default"
      />
      <ErrorMessage v-if="errorData.date" :message="errorData.date" />
    </FormField>
    <FormField labelName="amount">
      <FormInput type="number" name="amount" placeholder="enter your amount." v-model="formData.amount" />
      <ErrorMessage v-if="errorData.amount" :message="errorData.amount" />
    </FormField>
    <FormField labelName="description">
      <FormTextarea name="description" placeholder="enter your description." v-model="formData.description"/>
    </FormField>
    <div class="form__button flex items-center justify-end gap-6 mt-14">
      <Button type="reset" className="btn-cancel bg-warn hover:bg-[#f58f1b]" btnName="Cancel" />
      <Button type="submit" @click.prevent="manageTransaction('saveTransaction')" className="btn-save bg-highlight hover:bg-[#4aba73]" btnName="Save" v-if="formData.id" />
      <Button type="submit" @click.prevent="manageTransaction('createTransaction')" className="btn-confirm bg-highlight hover:bg-[#4aba73]" btnName="Confirm" v-else />
    </div>
  </form>
</template>

<style scoped>

:deep(.el-select__wrapper) {
  padding: .5rem 1rem !important;
  font-size: 1.6rem !important;
}

.el-radio {
  --el-radio-text-color: var(--color-dark);
  --el-radio-font-weight: 400 !important;
}

</style>