<script setup>
import Button from './Button.vue';
import { PhCaretLeft, PhCaretRight, PhDotsThree } from '@phosphor-icons/vue';
import { computed } from 'vue';

const props = defineProps({
    curPage: {
        type: Number,
        default: 1,
    },
    totalPage: {
        type: Number,
        default: 1,
    }
})

const emit = defineEmits(['updatePage'])

// Algorithm สำหรับปุ่ม paginations ถ้าเกิน 7 ปุ่ม
const ArrPageShow = computed(() => {
    if(props.totalPage <= 7) 
        return Array.from({ length: props.totalPage - 2}, (_, i) => i + 2);
    else
        if(props.curPage >= 5 && props.curPage <= props.totalPage - 3)
            return Array.from({ length: 5}, (_, i) => i + props.curPage - 2)
        else if(props.curPage < 5)
            return Array.from({ length: 5}, (_, i) => i + 2);
        else if(props.curPage > props.totalPage - 3)
            return Array.from({ length: 5}, (_, i) => props.totalPage - 1 - i).reverse();
})

</script>

<template>
    <div class="pagination flex items-center justify-center gap-1 tablet:gap-2 laptop:gap-4 mt-10 tablet:mt-15 laptop:mt-20">
        <Button class="pagination__icon" @click="emit('updatePage', curPage - 1)" :disabled="curPage <= 1" :class="{ 'pagination__icon-not-allowed': curPage <= 1 }">
            <PhCaretLeft class="dark:text-gray-300 text-[1.6rem] tablet:text-[1.8rem] laptop:text-[2rem]" />
        </Button>
        <Button class="pagination__page-number" :disabled="1 === curPage" :class="1 === curPage ? 'pagination__page-number-active bg-dark text-light hover:bg-dark dark:bg-[#3d3d3d] dark:hover:bg-[#3d3d3d]' : 'pagination__page-number bg-gray-200 text-dark hover:bg-gray-300 dark:bg-dark dark:text-light dark:hover:bg-[#3d3d3d]'" @click="emit('updatePage', 1)">
            1
        </Button>
        <PhDotsThree class="text-[1.6rem] tablet:text-[1.8rem] laptop:text-[2rem]" v-if="curPage > 4 && totalPage > 7"/>
        <Button class="pagination__page-number" 
            v-for="page in ArrPageShow"
            :key="page"
            :class="page === curPage ? 'pagination__page-number-active bg-dark text-light hover:bg-dark dark:bg-[#3d3d3d] dark:hover:bg-[#3d3d3d]' : 'pagination__page-number bg-gray-200 text-dark hover:bg-gray-300 dark:bg-dark dark:text-light dark:hover:bg-[#3d3d3d]'"
            @click="emit('updatePage', page)"
            :disabled="page === curPage">
            {{ page }}
        </Button>
        <PhDotsThree class="text-[1.6rem] tablet:text-[1.8rem] laptop:text-[2rem]" v-if="curPage <= totalPage - 4 && totalPage > 7"/>
        <Button v-if="totalPage > 1" class="pagination__page-number" :disabled="totalPage === curPage" :class="totalPage === curPage ? 'pagination__page-number-active bg-dark text-light hover:bg-dark dark:bg-[#3d3d3d] dark:hover:bg-[#3d3d3d]' : 'pagination__page-number bg-gray-200 text-dark hover:bg-gray-300 dark:bg-dark dark:text-light dark:hover:bg-[#3d3d3d]'" @click="emit('updatePage', totalPage)">
            {{ totalPage }}
        </Button>
        <Button class="pagination__icon" @click="emit('updatePage', curPage + 1)" :disabled="curPage >= totalPage" :class="{ 'pagination__icon-not-allowed': curPage >= totalPage }">
            <PhCaretRight class="dark:text-gray-300 text-[1.6rem] tablet:text-[1.8rem] laptop:text-[2rem]" />
        </Button>
    </div> 
</template>

<style scoped>

.pagination__icon {
    color: var(--color-dark);
    padding: 1rem;
    transition: none;
}

.pagination__icon-not-allowed {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination__page-number {
    padding: 0.25rem 1rem;
    transition: none;
}

.pagination__page-number-active {
    cursor: default;
}

</style>