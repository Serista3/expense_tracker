<script setup>
import FormField from './FormField.vue';
import FormInput from './FormInput.vue';
import FormTextarea from './FormTextarea.vue';
import Button from './Button.vue';
import { ref } from 'vue';

const radioValue = ref('')

</script>

<template>
  <form class="form flex flex-col gap-8">
    <FormField labelName="title">
      <FormInput type="text" name="title" placeholder="enter your title."/>
    </FormField>
    <FormField labelName="type">
      <el-radio-group v-model="radioValue">
        <el-radio value="expense" size="large">Expense</el-radio>
        <el-radio value="income" size="large">Income</el-radio>
      </el-radio-group>
    </FormField>
    <FormField labelName="category">
      <el-select v-model="value" placeholder="select your category" style="width: 100%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </FormField>
    <FormField labelName="date">
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="select your day"
        size="default"
      />
    </FormField>
    <FormField labelName="amount">
      <FormInput type="number" name="amount" placeholder="enter your amount." :min="1"  />
    </FormField>
    <FormField labelName="description">
      <FormTextarea name="description" placeholder="enter your description." />
    </FormField>
    <div class="form__button flex items-center justify-end gap-6 mt-14">
      <Button className="btn-cancel bg-warn hover:bg-[#f58f1b]" btnName="Cancel" />
      <Button className="btn-confirm bg-highlight hover:bg-[#4aba73]" btnName="Confirm" />
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