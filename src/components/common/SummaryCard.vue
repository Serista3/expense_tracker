<script setup>

const props = defineProps({
    title: String,
    amount: Number,
})

</script>

<template>
    <div class="summary__card inline-flex items-center gap-20 p-12 rounded-[.7rem] shadow-lg max-w-[35rem]">
        <div class="summary__card-detail flex flex-col gap-4">
            <h3 class="summary__card-title text-3xl">{{ props.title }}</h3>
            <div class="summary__card-amount text-5xl font-medium">{{ props.amount.toFixed(2, 0) }} THB</div>
        </div>
        <slot name="summary__card-icon"></slot>
    </div>
</template>