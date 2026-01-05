<script setup>
import BaseChart from './BaseChart.vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed } from 'vue';
import { useTheme } from '@/composables/useTheme';

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
const { curTheme } = useTheme();

// ข้อมูลใน Barchart
const barChartData = computed(() => {
  return { 
    labels: props.data.map(c => c.name),
    datasets: [
      {
        order: 0,
        backgroundColor: props.data.map(c => curTheme.value === 'dark' && c.color === '#212121' ? '#ffffff' : c.color),
        hoverBackgroundColor: props.data.map(c => curTheme.value === 'dark' && c.color === '#212121' ? '#bbbbbb' : c.hoverColor),
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
        color: `${curTheme.value === 'dark' ? '#fff' : '#212121'}`,
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
          color: `${curTheme.value === 'dark' ? 'oklch(44.6% 0.03 256.802)' : 'oklch(87.2% 0.01 258.338)' }`
        },
        title: {
          display: true,
          text: 'Amount' ,
          color: `${curTheme.value === 'dark' ? 'oklch(70.7% 0.022 261.325)' : 'oklch(55.2% 0.016 285.938)'}`,
          font: {
            weight: '300',
            size: 16,
          }
        },
        ticks: {
          color: `${curTheme.value === 'dark' ? '#FFFFFF' : '#212121'}`
        }
      },
      y: {
        grid: {
          color: `${curTheme.value === 'dark' ? 'oklch(44.6% 0.03 256.802)' : 'oklch(87.2% 0.01 258.338)' }`
        },
        title: {
          display: true,
          text: 'Category' ,
          color: `${curTheme.value === 'dark' ? 'oklch(70.7% 0.022 261.325)' : 'oklch(55.2% 0.016 285.938)'}`,
          font: {
            weight: '300',
            size: 16,
          }
        },
        ticks: {
          color: `${curTheme.value === 'dark' ? '#FFFFFF' : '#212121'}`
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
      class="bar-chart dark:bg-dark"
      :options="barChartOptions"
      :data="barChartData"
    />
    <div v-else class="text-gray-400 text-[1.6rem] font-light">no transactions</div>
  </BaseChart>
</template>