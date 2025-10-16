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
    <div class="pagination flex items-center justify-center gap-4 mt-20">
        <Button class="pagination__icon" @click="emit('updatePage', curPage - 1)" :disabled="curPage <= 1" :class="{ 'pagination__icon-not-allowed': curPage <= 1 }">
            <PhCaretLeft :size="20" class="dark:text-gray-300" />
        </Button>
        <Button class="pagination__page-number dark:border dark:border-gray-600" :class="1 === curPage ? 'pagination__page-number-active' : 'pagination__page-number'" @click="emit('updatePage', 1)">
            1
        </Button>
        <PhDotsThree :size="20" v-if="curPage > 4 && totalPage > 7"/>
        <Button class="pagination__page-number dark:border dark:border-gray-600 dark:bg-dark" 
            v-for="page in ArrPageShow"
            :key="page"
            :class="page === curPage ? 'pagination__page-number-active' : 'pagination__page-number'"
            @click="emit('updatePage', page)">
            {{ page }}
        </Button>
        <PhDotsThree :size="20" v-if="curPage <= totalPage - 4 && totalPage > 7"/>
        <Button v-if="totalPage > 1" class="pagination__page-number dark:border dark:border-gray-600" :class="totalPage === curPage ? 'pagination__page-number-active' : 'pagination__page-number'" @click="emit('updatePage', totalPage)">
            {{ totalPage }}
        </Button>
        <Button class="pagination__icon" @click="emit('updatePage', curPage + 1)" :disabled="curPage >= totalPage" :class="{ 'pagination__icon-not-allowed': curPage >= totalPage }">
            <PhCaretRight :size="20" class="dark:text-gray-300" />
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
    background-color: var(--color-gray-200);
    color: var(--color-dark);
    transition: none;
}

.pagination__page-number:hover {
    background-color: var(--color-gray-300);
}

.pagination__page-number-active {
    background-color: var(--color-dark);
    color: var(--color-light);
    cursor: default;
}

.pagination__page-number-active:hover {
    background-color: var(--color-dark);
}

</style>