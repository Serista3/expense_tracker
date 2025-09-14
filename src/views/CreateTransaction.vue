<script setup>
import { exCategory } from '@/composables/initial';
import Form from '@/components/Form.vue';
import TransactionPageLayout from '@/components/layout/TransactionPageLayout.vue';

const createData = function(payload){
  console.log(payload)
}

</script>

<template>
  <TransactionPageLayout title="Create Transaction">
    <Form :categoryData="exCategory" @createTransaction="createData" />
  </TransactionPageLayout>
</template>