<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import BaseChart from './BaseChart.vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Income',
      order: 0,
      backgroundColor: 'rgba(108, 188, 137, 0.5)',
      borderWidth: 2,
      borderColor: '#6cbc89',
      hoverBackgroundColor: '#4aba73',
      data: [400, 500, 300, 700],
    },
    {
      label: 'Expenses',
      order: 1,
      backgroundColor: 'rgba(247, 94, 94, 0.5)',
      borderWidth: 2,
      borderColor: '#f75e5e',
      hoverBackgroundColor: '#f72525',
      data: [300, 200, 400, 100],
    },
    {
      label: 'Balance',
      order: 2,
      backgroundColor: 'rgba(33, 33, 33, 0.7)',
      borderWidth: 2,
      borderColor: '#212121',
      hoverBackgroundColor: '#212121',
      data: [600, 700, 800, 1000],
    }
  ]
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Monthly Income vs Expenses',
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
};

</script>

<template>
  <BaseChart class="w-[75%] h-[45rem]">
    <Bar
      class="bar-chart"
      :options="barChartOptions"
      :data="barChartData"
    />
  </BaseChart>
</template>