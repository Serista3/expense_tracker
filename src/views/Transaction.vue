<script setup>
import Table from '@/components/Table.vue';
import Button from '@/components/Button.vue';

</script>

<template>
    <div class="transaction-page py-18 px-30 dark:text-light dark:bg-dark w-full">
        <h1 class="text-6xl font-semibold mb-10">Transactions</h1>
        <div class="manage-transaction-data flex justify-end items-center gap-8">
            <router-link to="/createTransaction"><Button className="btn-add bg-highlight hover:bg-[#4aba73] mb-10" btnName="Add" /></router-link>
        </div>
        <Table />
    </div>
</template>