<script setup>
import numeral from 'numeral';

const props = defineProps({
    title: String,
    amount: Number,
})

</script>

<template>
    <div class="summary__card inline-flex justify-between items-center p-4 tablet:p-6 laptop:p-8 rounded-[.7rem] shadow-lg">
        <div class="summary__card-detail flex flex-col gap-2 tablet:gap-3 desktop:gap-4">
            <h3 class="summary__card-title text-xl tablet:text-2xl">{{ props.title }}</h3>
            <div class="summary__card-amount text-2xl tablet:text-3xl laptop:text-4xl font-medium">{{ numeral(props.amount).format('0,0.00') }} THB</div>
        </div>
        <slot name="summary__card-icon"></slot>
    </div>
</template>