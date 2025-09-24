<script setup>
import MainLayout from '@/components/layout/MainLayout.vue';
import SummaryCard from '@/components/common/SummaryCard.vue';
import BarChart from '@/components/chart/BarChart.vue';
import Doughnut from '@/components/chart/Doughnut.vue';
import TransactionTable from '@/components/transaction/TransactionTable.vue';
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';
import { PhTrendUp, PhTrendDown, PhScales, PhTrash, PhPen } from '@phosphor-icons/vue';
import { useTransaction } from '@/composables/useTransaction';
import { useCategories } from '@/composables/useCategories';
import { computed } from 'vue';

const { transactions, isDeleteModalVisible, openDeleteModal, confirmDelTransaction } = useTransaction();
const { categories } = useCategories()

const recentTransactions = computed(() => {
    if(transactions.value.length)
        return Array.from(transactions.value).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
    return [];
})

const income = computed(() => transactions.value.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const expense = computed(() => transactions.value.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const balance = computed(() => income.value - expense.value ?? 0)

const categorySumExpenseTop5 = computed(() => {
    const newCategories = []
    categories.value.forEach(c => {
            newCategories.push(
                {
                    'name': c.name, 
                    'amount': transactions.value.filter(t => t.category === c.name && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
                    'color': c.color
                })
    })
    return newCategories.filter(n => n.amount !== 0).sort((a, b) => b.amount - a.amount).slice(0, 5)
})
const monthSummaries = computed(() => {
    const newMonths = []
})

</script>

<template>
    <MainLayout class="home-page">
        <div class="dashboard grid grid-cols-3 gap-10">
            <SummaryCard class="bg-highlight text-light" title="Total Income" :amount="income">
                <template #summary__card-icon>
                    <PhTrendUp :size="56" />
                </template>
            </SummaryCard>
            <SummaryCard class="bg-alert text-light" title="Total Expenses" :amount="expense">
                <template #summary__card-icon>
                    <PhTrendDown :size="56" />
                </template>
            </SummaryCard>
            <SummaryCard class="bg-smooth text-light" title="Balance" :amount="balance">
                <template #summary__card-icon>
                    <PhScales :size="56" />
                </template>
            </SummaryCard>
            <Doughnut :categorySumExpenseTop5="categorySumExpenseTop5" />
            <BarChart />
            <div class="recent-transaction col-span-full mt-10">
                <div class="recent-transaction__header mb-15 flex justify-between items-center">
                    <h2 class="text-4xl font-semibold">Recent Transactions</h2>
                    <router-link to="/transaction">
                        <Button class="btn-view-all bg-dark hover:bg-[#363636]">View All</Button>
                    </router-link>
                </div>
                <TransactionTable style="margin-bottom: 0;" @deleteTransaction="payload => openDeleteModal(payload.id)" :transactions="recentTransactions" :categories="categories">
                    <template #edit-btn><PhPen :size="24" color="#fff" /></template>
                    <template #del-btn><PhTrash :size="24" color="#fff" /></template>
                </TransactionTable>
            </div>
        </div>
        <Modal v-model="isDeleteModalVisible" nameModal="Are you sure?">
            <div class="group-btn flex items-center justify-center gap-8">
                <Button @click="confirmDelTransaction()" class="btn-yes bg-alert hover:bg-[#f72525]">Yes</Button>
                <Button @click="isDeleteModalVisible = false;" class="btn-no bg-dark hover:bg-[#363636]">No</Button>
            </div>
        </Modal>
    </MainLayout>
</template>