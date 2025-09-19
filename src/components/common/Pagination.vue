<script setup>
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';

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

</script>

<template>
    <div class="pagination flex items-center justify-center gap-4 mt-20">
        <PhCaretLeft :size="20" class="pagination__icon cursor-pointer mr-5" @click="emit('updatePage', props.curPage - 1)" />
        <div class="pagination__page-number px-4 py-1 rounded-[.7rem] font-semibold cursor-pointer" 
            v-for="page in totalPage" 
            :key="page"
            :class="page === props.curPage ? 'bg-dark text-light hover:bg-gray-600' : 'bg-gray-200 text-dark hover:bg-gray-300'"
            @click="emit('updatePage', page)">
            {{ page }}
        </div>
        <PhCaretRight :size="20" class="pagination__icon cursor-pointer ml-5" @click="emit('updatePage', props.curPage + 1)" />
    </div> 
</template>