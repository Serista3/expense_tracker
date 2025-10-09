<script setup>
import MainLayout from '@/components/layout/MainLayout.vue';
import TransactionTable from '@/components/transaction/TransactionTable.vue';
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';
import Search from '@/components/common/Search.vue';
import Filter from '@/components/common/Filter.vue';
import Pagination from '@/components/common/Pagination.vue';
import { useTransaction } from '@/composables/useTransaction';
import { useCategories } from '@/composables/useCategories';
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const { transactions, isDeleteModalVisible, openDeleteModal, confirmDelTransaction } = useTransaction();
const { categories } = useCategories();

const typeFil = ref(route.query.type ?? 'All Type')
const categoryFil = ref(route.query.categories ? route.query.categories.split(',') : [])

const types = ["All Type",'income', 'expense']
const options = Array.from(categories.value).map(c => ({ value: `${c.name}`, label: c.name}))

const updateQuery = function(key, value){
    const newQuery = { ...route.query }

    if(!value || (key === 'type' && value === 'All Type') || (key === 'categories' && value.length === 0))
        newQuery[key] = undefined
    else
        newQuery[key] = Array.isArray(value) ? value.map(v => v.toLowerCase()).join(',') : String(value).toLowerCase()

    router.push({ name: 'Transaction', query : newQuery})
}

// Filter transactions ตาม url query
const filterTransaction = computed(() => {
    const { title, type, categories } = { ...route.query }

    if(!title && !type && !categories)
        return transactions.value
    
    const categoryArr = categories ? categories.split(',') : []

    return Array.from(transactions.value).filter(transaction => {
        const isTitle = !title || transaction.title.toLowerCase().includes(title.toLowerCase())
        const isType = !type || type.toLowerCase().includes(transaction.type.toLowerCase())
        const isCategory = !categoryArr.length || categoryArr.find(c => c.toLowerCase() === transaction.category.toLowerCase())

        return isTitle && isType && isCategory
    })
})

const curPage = ref(route.query.page ? Number(route.query.page) : 1);
const totalPage = computed(() => Math.ceil(filterTransaction.value.length / 10) || 1);

// เปลี่ยน page ตามการกดปุ่ม
const updatePage = function(page) {
    if(!page || page > totalPage.value)
        return;

    curPage.value = page;
    updateQuery('page', page);
}

// ถ้าหน้า page ทั้งหมด change ให้ดูว่า page ปัจจุบันมากกว่า page ทั้งหมดรึป่าว ถ้าใช่ให้ page ปัจจุบัน = page ทั้งหมด
watch(totalPage, (newTotalPage) => {
    updatePage(curPage.value > newTotalPage ? newTotalPage : curPage.value);
})

// ให้แต่ละ page มี transaction แค่ 10 ตัว
const pageTransaction = computed(() => {
    const start = (curPage.value - 1) * 10;
    const end = start + 10;

    return filterTransaction.value.slice(start, end);
})

</script>

<template>
    <MainLayout class="transaction-page">
        <h1 class="text-6xl font-semibold mb-10">Transactions</h1>
        <div class="manage-transaction-data flex justify-end items-center gap-8 mb-10">
            <Search @searchData="payload => updateQuery('title', payload)" :initSearchVal="route.query.title" />
            <Filter style="max-width: 12rem;">
                <el-select v-model="typeFil" placeholder="Type" @change="updateQuery('type', typeFil)">
                    <el-option v-for="item, index in types" :key="index" :label="item" :value="item" />
                </el-select>
            </Filter>
            <Filter style="max-width: 20rem;">
                <el-select-v2 @change="updateQuery('categories', categoryFil)" v-model="categoryFil" :options="options" placeholder="Categories" multiple collapse-tags collapse-tags-tooltip/>
            </Filter>
            <router-link to="/createTransaction"><Button class="btn-add bg-highlight hover:bg-[#4aba73]">Add</Button></router-link>
        </div>
        <TransactionTable @deleteTransaction="payload => openDeleteModal(payload.id)" :transactions="pageTransaction" :categories="categories" />
        <Pagination :curPage="curPage" :totalPage="totalPage" @updatePage="updatePage" />
        <Modal v-model="isDeleteModalVisible" nameModal="Are you sure?">
            <div class="group-btn flex items-center justify-center gap-8">
                <Button @click="confirmDelTransaction()" class="btn-yes bg-alert hover:bg-[#f72525]">Yes</Button>
                <Button @click="isDeleteModalVisible = false;" class="btn-no bg-dark hover:bg-[#363636]">No</Button>
            </div>
        </Modal>
    </MainLayout>
</template>