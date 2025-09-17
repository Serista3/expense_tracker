<script setup>
import Form from '@/components/Form.vue';
import TransactionPageLayout from '@/components/layout/TransactionPageLayout.vue';
import { useRoute, useRouter } from 'vue-router';
import { exData, exCategory } from '@/composables/initial';

const route = useRoute();
const router = useRouter();

const getEditData = function(){
  return Array.from(exData.value).filter(data => data.id === route.params.id).at(0)
}

const saveEditData = function(payload){
  console.log(payload)
}

</script>

<template>
  <TransactionPageLayout title="Edit Transaction">
    <Form @saveTransaction="saveEditData" :editData="getEditData()" :categoryData="exCategory"/>
  </TransactionPageLayout>
</template>