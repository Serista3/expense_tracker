<script setup>
import FormField from './FormField.vue';
import FormInput from './FormInput.vue';
import FormTextarea from './FormTextarea.vue';
import Button from './Button.vue';
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

const createTransaction = function(){
  emit('createTransaction', formData.value)
}

const saveEditTransaction = function(){
  emit('saveTransaction', formData.value)
}

const cancelEditTransaction = function(){
  emit('cancelTransaction')
}

</script>

<template>
  <form class="form flex flex-col gap-8 max-w-[50rem] w-full">
    <FormField labelName="title">
      <FormInput type="text" name="title" placeholder="enter your title." v-model="formData.title" />
    </FormField>
    <FormField labelName="type">
      <el-radio-group v-model="formData.type">
        <el-radio value="expense" size="large">Expense</el-radio>
        <el-radio value="income" size="large">Income</el-radio>
      </el-radio-group>
    </FormField>
    <FormField labelName="category">
      <el-select v-model="formData.category" placeholder="select your category" style="width: 100%">
        <el-option
          v-for="item in category"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </FormField>
    <FormField labelName="date">
      <el-date-picker
        v-model="formData.date"
        type="date"
        placeholder="select your day"
        size="default"
      />
    </FormField>
    <FormField labelName="amount">
      <FormInput type="number" name="amount" placeholder="enter your amount." v-model="formData.amount" />
    </FormField>
    <FormField labelName="description">
      <FormTextarea name="description" placeholder="enter your description." v-model="formData.description"/>
    </FormField>
    <div class="form__button flex items-center justify-end gap-6 mt-14">
      <Button @click="cancelEditTransaction" className="btn-cancel bg-warn hover:bg-[#f58f1b]" btnName="Cancel" />
      <Button @click.prevent="saveEditTransaction" className="btn-save bg-highlight hover:bg-[#4aba73]" btnName="Save" v-if="formData.id" />
      <Button @click.prevent="createTransaction" className="btn-confirm bg-highlight hover:bg-[#4aba73]" btnName="Confirm" v-else />
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