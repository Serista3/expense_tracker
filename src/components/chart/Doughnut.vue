<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import BaseChart from './BaseChart.vue';
import { computed } from 'vue';

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  calcuCategoryTop5: {
    type: Array,
    default: [],
  },
  title: {
    type: String,
    default: '',
  }
})

const doughnutData = computed(() => {
  return {
    labels: props.calcuCategoryTop5.map(c => c.name),
    datasets: [
      {
        backgroundColor: props.calcuCategoryTop5.map(c => c.color),
        hoverBackgroundColor: props.calcuCategoryTop5.map(c => c.hoverColor),
        boderWidth: 2,
        borderColor: props.calcuCategoryTop5.map(c => c.backgroundColor),
        data: props.calcuCategoryTop5.map(c => c.amount)
      }
    ]
  }
})

const doughnutOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: props.title,
        color: '#212121',
        font: {
          size: 24
        }
      }
    }
  }
});

</script>

<template>
    <BaseChart>
        <Doughnut
            :options="doughnutOptions"
            :data="doughnutData"
        />
    </BaseChart>
</template>