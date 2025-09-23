<script setup>
import SummaryCard from './common/SummaryCard.vue';
import { PhTrendUp, PhTrendDown, PhScales } from '@phosphor-icons/vue';
import BarChart from './chart/BarChart.vue';
import DoughnutChart from './chart/Doughnut.vue';
import { computed } from 'vue';

const props = defineProps({
    transactions: {
        type: Array,
        default: [],
    }
})

const income = computed(() => props.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const expense = computed(() => props.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) ?? 0)
const balance = computed(() => income.value - expense.value ?? 0)

</script>

<template>
    <div class="dashboard flex flex-col justify-between items-center gap-30">
        <div class="dashboard__charts flex items-center gap-10 w-full">
            <DoughnutChart />
            <BarChart />
        </div>
        <div class="summary__cards flex justify-between items-center gap-10">
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
            <SummaryCard class="bg-dark text-light" title="Balance" :amount="balance">
                <template #summary__card-icon>
                    <PhScales :size="56" />
                </template>
            </SummaryCard>
        </div>
    </div>
</template>