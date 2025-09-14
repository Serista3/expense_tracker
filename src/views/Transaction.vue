<script setup>
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
</script>

<template>
    <div class="transaction-page py-18 px-30 dark:text-light dark:bg-dark w-full">
        <h1 class="text-6xl font-semibold mb-20">Transactions</h1>
        <Table />
        <Modal typeModal="Add"/>
        <Modal typeModal="Edit"/>
        <Modal typeModal="Delete"/>
    </div>
</template>