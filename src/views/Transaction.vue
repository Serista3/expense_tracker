<script setup>
import TransactionTable from '@/components/transaction/TransactionTable.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import Search from '@/components/common/Search.vue';
import { getDataFromLocalStorage, updateDataToLocalStorage } from '@/composables/initial';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const transactions = ref(getDataFromLocalStorage('transactions') ?? [])
const transactionFilter = ref(transactions.value);
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

const searchTransaction = function(payload){
    payload !== '' ? router.push({ name: 'Transaction', query: { 'title': payload } }) : router.push({ name: 'Transaction' })
}

watch(() => route.query, (newQuery) => {
    transactionFilter.value = newQuery.title ? 
    Array.from(transactions.value).filter(t => String(t.title).toLocaleLowerCase().includes(newQuery.title.toLocaleLowerCase()))
     : transactions.value
}, { immediate: true})

</script>

<template>
    <div class="transaction-page py-18 px-30 dark:text-light dark:bg-dark w-full">
        <h1 class="text-6xl font-semibold mb-10">Transactions</h1>
        <div class="manage-transaction-data flex justify-end items-center gap-8 mb-10">
            <Search @searchData="searchTransaction" :initSearchVal="route.query.title" />
            <router-link to="/createTransaction"><Button class="btn-add bg-highlight hover:bg-[#4aba73]">Add</Button></router-link>
        </div>
        <TransactionTable @deleteTransaction="delTransaction" :transactions="transactionFilter" :categories="categories" />
        <Modal v-model="isDeleteModalVisible" nameModal="Are you sure?">
            <div class="group-btn flex items-center justify-center gap-8">
                <Button @click="confirmDelTransaction" class="btn-yes bg-alert hover:bg-[#f72525]">Yes</Button>
                <Button @click="closeDeleteModal" class="btn-no bg-dark hover:bg-[#363636]">No</Button>
            </div>
        </Modal>
    </div>
</template>