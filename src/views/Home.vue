<script setup>
import Dashboard from '@/components/Dashboard.vue';
import TransactionTable from '@/components/transaction/TransactionTable.vue';
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';
import { getDataFromLocalStorage } from '@/composables/initial';
import { ref, computed } from 'vue';

const recentTransactions = computed(() => {
    const transactions = getDataFromLocalStorage('transactions') ?? []
    if(transactions.length)
        return Array.from(transactions).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
})
const categories = ref(getDataFromLocalStorage('categories') ?? [])

// const isDeleteModalVisible = ref(false);
// let transactionToDelId = null;

// const openDeleteModal = function(id) {
//     transactionToDelId = id
//     isDeleteModalVisible.value = true;
// };

// const confirmDelTransaction = function(){
//     transactions.value = transactions.value.filter(t => t.id !== transactionToDelId);
//     updateDataToLocalStorage('transactions', transactions.value)
//     isDeleteModalVisible.value = false;
//     transactionToDelId = null
// }

</script>

<template>
    <div class="home-page py-18 px-30 dark:text-light dark:bg-dark w-full">
        <Dashboard />
        <div class="recent-transactions mt-30">
            <h2 class="text-4xl font-semibold mb-15">Recent Transactions</h2>
            <TransactionTable @deleteTransaction="payload => openDeleteModal(payload.id)" :transactions="recentTransactions" :categories="categories"/>
        </div>
        <Modal v-model="isDeleteModalVisible" nameModal="Are you sure?">
            <div class="group-btn flex items-center justify-center gap-8">
                <Button @click="confirmDelTransaction" class="btn-yes bg-alert hover:bg-[#f72525]">Yes</Button>
                <Button @click="isDeleteModalVisible = false;" class="btn-no bg-dark hover:bg-[#363636]">No</Button>
            </div>
        </Modal>
    </div>
</template>