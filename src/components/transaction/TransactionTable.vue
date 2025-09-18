<script setup>
import Table from '../table/Table.vue';
import TableRow from '../table/TableRow.vue';
import TableData from '../table/TableData.vue';
import Button from '@/components/common/Button.vue';
import { computed } from 'vue';

const props = defineProps({
    'transactions': {
        type: Array,
        default: [],
    },
    'categories': {
        type: Array,
        default: [],
    }
})
const emit = defineEmits(['deleteTransaction'])

const transactions = computed(() => [...props.transactions]);
const categories = computed(() => [...props.categories]);

const deleteTransaction = function(transaction) {
  emit('deleteTransaction', transaction)
}

</script>

<template>
    <Table>
      <TableRow v-if="transactions.length !== 0" v-for="t in transactions" :key="t.id">
        <TableData>
          {{ t.title }}
        </TableData>
        <TableData>
          <div class="tag inline-block px-4 py-1 rounded-xl text-light font-semibold" :style="{ backgroundColor: categories.find(c => c.name === t.category)?.color }">{{ t.category }}</div>
        </TableData>
        <TableData>
          {{ t.date }}
        </TableData>
        <TableData class="font-semibold" :class="{'text-highlight' : t.type === 'income', 'text-alert' : t.type === 'expense'}">
          {{ t.type === 'income' ? `+${t.amount}` : `-${t.amount}` }} THB
        </TableData>
        <TableData class="flex justify-center items-center gap-8">
          <router-link :to="{name: 'EditTransaction', params: {id : t.id}}"><Button class="btn-edit bg-warn hover:bg-[#f58f1b]">Edit</Button></router-link>
          <Button @click="deleteTransaction(t)" class="btn-delete bg-alert hover:bg-[#f72525]">Delete</Button>
        </TableData>
      </TableRow>
      <TableRow v-else>
        <TableData class="text-gray-400 font-light text-center" colspan="5">no data.</TableData>
      </TableRow>
    </Table>
</template>