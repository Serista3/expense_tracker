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
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const { transactions, isDeleteModalVisible, openDeleteModal, confirmDelTransaction } = useTransaction();
const { categories } = useCategories()
const { formattedHextoRgba, months } = useFormat()
const { userBudget } = useUserData()
const route = useRoute()
const router = useRouter()

const filterMonth = ref(route.query.month || months[new Date().getMonth()])
const filterYear = ref(Number(route.query.year) || new Date().getFullYear())

const allYear = computed(() => [...new Set(Array.from(transactions.value).map(t => new Date(t.date).getFullYear()).sort((a, b) => a - b))])
const allMonth = computed(() => [...new Set(Array.from(transactions.value).map(t => new Date(t.date).getMonth()).sort((a, b) => a - b))])

// Filter ตามเดือนและปีใน url query
const filterTransaction = computed(() => {
    return Array.from(transactions.value).filter(t => {
        if (months[new Date(t.date).getMonth()] === filterMonth.value && new Date(t.date).getFullYear() === filterYear.value)
            return t
    })
})

// คำนวนหา transactions ล่าสุด มา 3 ตัว
const recentTransactions = computed(() => {
    if(filterTransaction.value.length)
        return Array.from(filterTransaction.value).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
    return [];
})

const income = computed(() => filterTransaction.value.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const expense = computed(() => filterTransaction.value.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const balance = computed(() => income.value - expense.value ?? 0)

// คำนวนค่าใช้จ่ายตามหมวดหมู่
const calcuCategory = function(type){
    const newCategories = []
    categories.value.forEach(c => {
            newCategories.push(
                {
                    'name': c.name, 
                    'amount': filterTransaction.value.filter(t => t.category === c.name && t.type === type).reduce((sum, t) => sum + t.amount, 0),
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
        <div class="dashboard__filter absolute top-8 right-0 flex gap-4 justify-center items-center">
            <el-select @change="updateQuery(filterMonth)" v-model="filterMonth" placeholder="select month" style="width: 15rem">
                <el-option
                v-for="(m, index) in allMonth"
                :key="index"
                :label="months[m]"
                :value="months[m]"
                />
            </el-select>
            <el-select @change="updateQuery(filterYear)" v-model="filterYear" placeholder="select year" style="width: 10rem">
                <el-option
                v-for="(y, index) in allYear"
                :key="index"
                :label="y"
                :value="y"
                />
            </el-select>
        </div>
        <div class="dashboard grid grid-cols-4 gap-10">
            <SummaryCard class="bg-highlight text-light" title="Total Income" :amount="income">
                <template #summary__card-icon>
                    <PhTrendUp :size="48" />
                </template>
            </SummaryCard>
            <SummaryCard class="bg-alert text-light" title="Total Expenses" :amount="expense">
                <template #summary__card-icon>
                    <PhTrendDown :size="48" />
                </template>
            </SummaryCard>
            <SummaryCard class="bg-smooth text-light" title="Balance" :amount="balance">
                <template #summary__card-icon>
                    <PhScales :size="48" />
                </template>
            </SummaryCard>
            <SummaryCard class="bg-dark text-light" title="Budget" :amount="50000">
                <template #summary__card-icon>
                    <PhBank :size="48" />
                </template>
            </SummaryCard>
            <BarChart class="col-span-2" :data="top5Income" title="Top 5 Income" />
            <BarChart class="col-span-2" :data="expenseCategories" title="Expense by Category" />
            <div class="recent-transaction bg-light col-span-full py-14 px-20 shadow-lg rounded-[.7rem]">
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