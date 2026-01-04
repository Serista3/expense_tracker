<script setup>
import MainLayout from '@/components/layout/MainLayout.vue';
import SummaryCard from '@/components/common/SummaryCard.vue';
import BarChart from '@/components/chart/BarChart.vue';
import TransactionTable from '@/components/transaction/TransactionTable.vue';
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';
import { PhTrendUp, PhTrendDown, PhScales, PhTrash, PhPen, PhBank } from '@phosphor-icons/vue';
import { useTransaction } from '@/composables/useTransaction';
import { useCategories } from '@/composables/useCategories';
import { useFormat } from '@/composables/useFormat';
import { useUserData } from '@/composables/useUserData';
import { useModalScrollLock } from '@/composables/useModalScrollLock';
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const { transactions, isDeleteModalVisible, openDeleteModal, confirmDelTransaction, transactionToDel } = useTransaction();
const { categories } = useCategories()
const { formattedHextoRgba, months, formattedUppercaseFirstChar } = useFormat()
const { userBudgets } = useUserData()
useModalScrollLock(isDeleteModalVisible);
const route = useRoute()
const router = useRouter()

const filterMonth = ref(route.query.month || months[new Date().getMonth()])
const filterYear = ref(Number(route.query.year) || new Date().getFullYear())

const allYear = computed(() => [...new Set(Array.from(transactions.value).map(t => new Date(t.date).getFullYear()).sort((a, b) => a - b))])
const allMonth = computed(() => [...new Set(Array.from(transactions.value).map(t => new Date(t.date).getMonth()).sort((a, b) => a - b))])

// Filter ตามเดือนและปีใน url query
const filterTransactionsbyMonthAndYear = computed(() => {
    return Array.from(transactions.value).filter(t => {
        if (months[new Date(t.date).getMonth()] === filterMonth.value && new Date(t.date).getFullYear() === filterYear.value)
            return t
    })
})

// คำนวนหา transactions ล่าสุด มา 3 ตัว
const recentTransactions = computed(() => {
    if(filterTransactionsbyMonthAndYear.value.length)
        return Array.from(filterTransactionsbyMonthAndYear.value).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
    return [];
})

const income = computed(() => filterTransactionsbyMonthAndYear.value.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const expense = computed(() => filterTransactionsbyMonthAndYear.value.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const balance = computed(() => income.value - expense.value ?? 0)
const budget = computed(() => userBudgets.value.find(b => months[b.month] === filterMonth.value && b.year === filterYear.value)?.amount ?? 1)

// คำนวนค่าใช้จ่ายตามหมวดหมู่
const calcuCategory = function(type){
    const newCategories = []
    categories.value.forEach(c => {
            newCategories.push(
                {
                    'name': c.name, 
                    'amount': filterTransactionsbyMonthAndYear.value.filter(t => t.category === c.name && t.type === type).reduce((sum, t) => sum + t.amount, 0),
                    'color': formattedHextoRgba(c.color, 0.5),
                    'backgroundColor': formattedHextoRgba(c.color, 0.8),
                    'hoverColor': formattedHextoRgba(c.color, 1),
                })
    })
    return newCategories.filter(n => n.amount !== 0).sort((a, b) => b.amount - a.amount)
}

const top5Income = computed(() => calcuCategory('income').slice(0, 5))
const expenseCategories = computed(() => calcuCategory('expense'))

const updateQuery = function(filter){
    const query = {...route.query}
    
    if(parseInt(filter))
        query.year = filter
    else
        query.month = filter

    router.push({ name: 'Home', query: query })
}

</script>

<template>
    <MainLayout class="home-page relative">
        <div class="dashboard__filter absolute top-8 right-8 flex gap-4 justify-center items-center">
            <el-select @change="updateQuery(filterMonth)" v-model="filterMonth" placeholder="select month">
                <el-option
                v-for="(m, index) in allMonth"
                :key="index"
                :label="formattedUppercaseFirstChar(months[m])"
                :value="months[m]"
                />
            </el-select>
            <el-select @change="updateQuery(filterYear)" v-model="filterYear" placeholder="select year">
                <el-option
                v-for="(y, index) in allYear"
                :key="index"
                :label="y"
                :value="y"
                />
            </el-select>
        </div>
        <div class="dashboard grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-8 tablet:gap-9 laptop:gap-10">
            <SummaryCard class="bg-highlight text-light" title="Total Income" :amount="income">
                <template #summary__card-icon>
                    <PhTrendUp class="text-[4.2rem]" />
                </template>
            </SummaryCard>
            <SummaryCard class="bg-alert text-light" title="Total Expenses" :amount="expense">
                <template #summary__card-icon>
                    <PhTrendDown class="text-[4.2rem]" />
                </template>
            </SummaryCard>
            <SummaryCard class="bg-smooth text-light" title="Balance" :amount="balance">
                <template #summary__card-icon>
                    <PhScales class="text-[4.2rem]" />
                </template>
            </SummaryCard>
            <SummaryCard class="bg-dark text-light border border-gray-300 dark:border-gray-600" title="Budget" :amount="budget">
                <template #summary__card-icon>
                    <PhBank class="text-[4.2rem]" />
                </template>
            </SummaryCard>
            <BarChart class="col-span-full desktop:col-span-2" :data="top5Income" title="Top 5 Income" />
            <BarChart class="col-span-full desktop:col-span-2" :data="expenseCategories" title="Expense by Category" />
            <div class="recent-transaction bg-light dark:bg-dark border border-gray-300 dark:border-gray-600 col-span-full p-10 tablet:p-15 laptop:p-20 shadow-lg rounded-[.7rem]">
                <div class="recent-transaction__header mb-8 tablet:mb-12 laptop:mb-15 flex justify-between items-center gap-2">
                    <h2 class="text-4xl font-semibold inline-block leading-12">Recent Transactions</h2>
                    <router-link to="/transaction" class="flex-none">
                        <Button class="btn-view-all text-light bg-dark hover:bg-[#363636] dark:border dark:border-gray-500">View All</Button>
                    </router-link>
                </div>
                <div class="recent-transaction__table overflow-x-auto">
                    <TransactionTable style="margin-bottom: 0;" @deleteTransaction="payload => openDeleteModal(payload)" :transactions="recentTransactions" :categories="categories">
                        <template #edit-btn><PhPen class="text-[2rem]" color="#fff" /></template>
                        <template #del-btn><PhTrash class="text-[2rem]" color="#fff" /></template>
                    </TransactionTable>
                </div>
            </div>
        </div>
        <Modal v-model="isDeleteModalVisible" nameModal="Delete transaction">
            <p class="text-gray-400 text-center font-light mt-[-1rem] text-[1.6rem]">You are going to delete <span class="font-semibold text-alert">{{ transactionToDel.title }}</span>. Are you sure to delete it ?</p>
            <div class="group-btn flex items-center justify-center gap-6 tablet:gap-8 mt-15 tablet:mt-17 laptop:mt-20">
                <Button @click="confirmDelTransaction()" class="btn-yes bg-alert hover:bg-[#f72525] text-light">Confirm</Button>
                <Button @click="isDeleteModalVisible = false;" class="btn-no bg-dark hover:bg-[#363636] text-light dark:border dark:border-gray-600">Cancel</Button>
            </div>
        </Modal>
    </MainLayout>
</template>
<style scoped>

:deep(.el-select__wrapper) {
    width: 12rem;
    min-height: 4rem;
    font-size: 1.6rem;
    border-radius: .7rem;
}

.el-select-dropdown__item {
    font-size: 1.6rem;
}

</style>