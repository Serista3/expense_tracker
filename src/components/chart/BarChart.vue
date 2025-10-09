<script setup>
import BaseChart from './BaseChart.vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  title: {
    type: String,
    default: 'Bar Chart'
  },
  data: {
    type: Array,
    default: [],
  },
})

// ข้อมูลใน Barchart
const barChartData = computed(() => {
  return { 
    labels: props.data.map(c => c.name),
    datasets: [
      {
        order: 0,
        backgroundColor: props.data.map(c => c.color),
        hoverBackgroundColor: props.data.map(c => c.hoverColor),
        boderWidth: 2,
        borderColor: props.data.map(c => c.backgroundColor),
        data: props.data.map(c => c.amount)
      }
    ]
  }
});

// config ใน Barchart
const barChartOptions = computed(() => {
  return {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: props.title,
        color: '#212121',
        font: {
          size: 24
        }
      },
      legend: {
        display: false,
      }
    },

    scales: {
      x: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        title: {
          display: true,
          text: 'Amount' ,
          color: 'rgba(0,0,0,0.4)',
          font: {
            weight: '300',
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
      v-if="data.length"
      class="bar-chart"
      :options="barChartOptions"
      :data="barChartData"
    />
    <div v-else class="text-gray-400 text-[1.4rem] font-light">no transactions</div>
  </BaseChart>
</template>