<template>
    <div class="chart-container bg-light dark:bg-dark border border-gray-300 dark:border-gray-600 shadow-lg rounded-[.7rem] p-8 h-[32rem] flex justify-center items-center">
        <slot></slot>
    </div>
</template>

<style scoped>

.chart-container {
  position: relative;
}

</style>