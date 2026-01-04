<script setup>
import numeral from 'numeral';

const props = defineProps({
    title: String,
    amount: Number,
})

</script>

<template>
    <div class="summary__card inline-flex justify-between items-center p-8 rounded-[.7rem] shadow-lg">
        <div class="summary__card-detail flex flex-col gap-4">
            <h3 class="summary__card-title text-3xl">{{ props.title }}</h3>
            <div class="summary__card-amount text-4xl font-medium">{{ numeral(props.amount).format('0,0.00') }} THB</div>
        </div>
        <slot name="summary__card-icon"></slot>
    </div>
</template>