<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import BaseChart from './BaseChart.vue';

ChartJS.register(ArcElement, Tooltip, Legend)

const doughnutData = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
};

</script>

<template>
    <BaseChart class="w-[25%] h-[30rem]">
        <Doughnut
            :options="doughnutOptions"
            :data="doughnutData"
        />
    </BaseChart>
</template>