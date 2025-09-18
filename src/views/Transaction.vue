<script setup>
import TransactionTable from '@/components/transaction/TransactionTable.vue';
import Button from '@/components/common/Button.vue';
import { getDataFromLocalStorage } from '@/composables/initial';
import { ref } from 'vue';

const transactions = ref(getDataFromLocalStorage('transactions') ?? [])
const categories = ref(getDataFromLocalStorage('categories') ?? [])

</script>

<template>
    <div class="transaction-page py-18 px-30 dark:text-light dark:bg-dark w-full">
        <h1 class="text-6xl font-semibold mb-10">Transactions</h1>
        <div class="manage-transaction-data flex justify-end items-center gap-8">
            <router-link to="/createTransaction"><Button className="btn-add bg-highlight hover:bg-[#4aba73] mb-10" btnName="Add" /></router-link>
        </div>
        <TransactionTable :transactions="transactions" :categories="categories" />
    </div>
</template>