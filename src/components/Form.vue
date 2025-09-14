<script setup>
import FormInput from './FormInput.vue';
import Button from './Button.vue';
import { ref } from 'vue';

const radioValue = ref('')

</script>

<template>
  <form class="form flex flex-col gap-8">
    <FormInput type="text" name="title" placeholder="enter your title."/>
    <div class="form__radio">
      <div class="font-semibold">Type:</div>
      <el-radio-group v-model="radioValue">
        <el-radio value="expense" size="large">Expense</el-radio>
        <el-radio value="income" size="large">Income</el-radio>
      </el-radio-group>
    </div>
    <div class="form__category">
      <div class="font-semibold mb-4">Category:</div>
      <el-select v-model="value" placeholder="select your category" style="width: 100%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="form__date">
      <div class="font-semibold mb-4">Date:</div>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="select your day"
        size="default"
      />
    </div>
    <FormInput type="number" name="amount" placeholder="enter your amount." :min="1"  />
    <FormInput type="textarea" name="description" placeholder="enter your description." />
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