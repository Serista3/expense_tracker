<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import BaseChart from './BaseChart.vue';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  monthSummaries: {
    type: Array,
    default: [],
  }
})

const barChartData = computed(() => {
  return { 
    labels: props.monthSummaries.map(m => m.month),
    datasets: [
      {
        label: 'Income',
        order: 0,
        backgroundColor: 'rgba(108, 188, 137, 0.5)',
        borderWidth: 2,
        borderColor: '#6cbc89',
        hoverBackgroundColor: '#4aba73',
        data: props.monthSummaries.map(m => m.income),
      },
      {
        label: 'Expense',
        order: 1,
        backgroundColor: 'rgba(247, 94, 94, 0.5)',
        borderWidth: 2,
        borderColor: '#f75e5e',
        hoverBackgroundColor: '#f72525',
        data: props.monthSummaries.map(m => m.expense),
      }
    ]
  }
});

const barChartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Income vs Expense',
        color: '#212121',
        font: {
          size: 24
        }
      }
    },

    scales: {
      y: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        title: {
          display: true,
          text: 'Amount (THB)' ,
          color: '#212121',
          font: {
            weight: '500',
            size: 14,
          }
        }
      }
    }
  }
});

</script>

<template>
  <BaseChart>
    <Bar
      class="bar-chart"
      :options="barChartOptions"
      :data="barChartData"
    />
  </BaseChart>
</template>