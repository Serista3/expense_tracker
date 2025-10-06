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
import { useFormat } from '@/composables/useFormat';
import { computed } from 'vue';
import { months } from '@/composables/useFormat';

const { transactions, isDeleteModalVisible, openDeleteModal, confirmDelTransaction } = useTransaction();
const { categories } = useCategories()
const { formattedHextoRgba } = useFormat()

const recentTransactions = computed(() => {
    if(transactions.value.length)
        return Array.from(transactions.value).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
    return [];
})

const income = computed(() => transactions.value.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const expense = computed(() => transactions.value.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const balance = computed(() => income.value - expense.value ?? 0)

const calcuCategoryTop5 = function(type){
    const newCategories = []
    categories.value.forEach(c => {
            newCategories.push(
                {
                    'name': c.name, 
                    'amount': transactions.value.filter(t => t.category === c.name && t.type === type).reduce((sum, t) => sum + t.amount, 0),
                    'color': formattedHextoRgba(c.color, 0.5),
                    'backgroundColor': formattedHextoRgba(c.color, 0.8),
                    'hoverColor': formattedHextoRgba(c.color, 1),
                })
    })
    return newCategories.filter(n => n.amount !== 0).sort((a, b) => b.amount - a.amount).slice(0, 5)
}

const top5Income = computed(() => calcuCategoryTop5('income'))
const top5Expense = computed(() => calcuCategoryTop5('expense'))

const monthSummaries = computed(() => {
    const curMonth = new Date().getMonth()
    const durationMonth = Array.from({length: 4}, (v, i) => {
        if (curMonth + i >= months.length)
            return 12 - (curMonth + 3)
        return curMonth + i
    })
    const arrMonths = [months[durationMonth[0]], months[durationMonth[1]], months[durationMonth[2]], months[durationMonth[3]]]
    const sumTransactionMonth = arrMonths.map(m => {
        return { 
            month: m,
            income: transactions.value.filter(t => t.type === 'income' && months[new Date(t.date).getMonth()] === m).reduce((sum, t) => sum + t.amount, 0) ?? 0,
            expense: transactions.value.filter(t => t.type === 'expense' && months[new Date(t.date).getMonth()] === m).reduce((sum, t) => sum + t.amount, 0) ?? 0,
        }
    })
    return sumTransactionMonth;
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
            <Doughnut :calcuCategoryTop5="top5Income" title="Top 5 Income" />
            <Doughnut :calcuCategoryTop5="top5Expense" title="Top 5 Expense" />
            <BarChart :monthSummaries="monthSummaries" />
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