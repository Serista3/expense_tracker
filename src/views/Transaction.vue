<script setup>
import TransactionTable from '@/components/transaction/TransactionTable.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import { getDataFromLocalStorage, updateDataToLocalStorage } from '@/composables/initial';
import { ref } from 'vue';

const transactions = ref(getDataFromLocalStorage('transactions') ?? [])
const categories = ref(getDataFromLocalStorage('categories') ?? [])

const isDeleteModalVisible = ref(false);
const delArrData = ref([])

const openDeleteModal = function() {
    isDeleteModalVisible.value = true;
};

const closeDeleteModal = function(){
    isDeleteModalVisible.value = false;
}

const confirmDelTransaction = function(){
    transactions.value = delArrData.value;
    updateDataToLocalStorage('transactions', delArrData.value)
    closeDeleteModal()
}

const delTransaction = function(payload){
    openDeleteModal()
    delArrData.value = Array.from(getDataFromLocalStorage('transactions')).filter(t => t.id !== payload.id)
}

</script>

<template>
    <div class="transaction-page py-18 px-30 dark:text-light dark:bg-dark w-full">
        <h1 class="text-6xl font-semibold mb-10">Transactions</h1>
        <div class="manage-transaction-data flex justify-end items-center gap-8">
            <router-link to="/createTransaction"><Button className="btn-add bg-highlight hover:bg-[#4aba73] mb-10" btnName="Add" /></router-link>
        </div>
        <TransactionTable @deleteTransaction="delTransaction" :transactions="transactions" :categories="categories" />
        <Modal v-model="isDeleteModalVisible" nameModal="Are you sure?">
            <div class="group-btn flex items-center justify-center gap-8">
                <Button @click="confirmDelTransaction" className="btn-yes bg-alert hover:bg-[#f72525]" btnName="Yes" />
                <Button @click="closeDeleteModal" className="btn-no bg-dark hover:bg-[#363636]" btnName="No" />
            </div>
        </Modal>
    </div>
</template>