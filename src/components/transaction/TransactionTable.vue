<script setup>
import Table from '../table/Table.vue';
import TableHeader from '../table/TableHeader.vue';
import TableHead from '../table/TableHead.vue';
import TableBody from '../table/TableBody.vue';
import TableRow from '../table/TableRow.vue';
import TableData from '../table/TableData.vue';
import Button from '@/components/common/Button.vue';
import { useFormat } from '@/composables/useFormat';
import { computed } from 'vue';
import numeral from 'numeral';

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
const { formattedDateToRead } = useFormat();

const deleteTransaction = function(transaction) {
  emit('deleteTransaction', transaction)
}

</script>

<template>
    <Table class="min-w-[65rem]">
      <TableHeader>
        <TableHead>Title</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead style="text-align: center;">Action</TableHead>
      </TableHeader>
      <TableBody v-if="transactions.length">
        <TableRow v-for="t in transactions" :key="t.id">
          <TableData>
            {{ t.title }}
          </TableData>
          <TableData>
            <div class="tag inline-block px-4 py-1 rounded-xl text-light font-semibold dark:border dark:border-gray-600" :style="{ backgroundColor: categories.find(c => c.name === t.category)?.color }">{{ t.category }}</div>
          </TableData>
          <TableData>
            {{ formattedDateToRead(t.date) }}
          </TableData>
          <TableData class="font-semibold" :class="{'text-highlight' : t.type === 'income', 'text-alert' : t.type === 'expense'}">
            {{ t.type === 'income' ? `${numeral(t.amount).format('+0,0.00')}` : `-${numeral(t.amount).format('0,0.00')}` }} THB
          </TableData>
          <TableData class="flex justify-center items-center gap-4 tablet:gap-6 laptop:gap-8">
              <router-link :to="{name: 'EditTransaction', params: {id : t.id}}">
                  <Button class="btn-edit bg-warn hover:bg-[#f58f1b] text-light">
                    <slot name="edit-btn">Edit</slot>
                  </Button>
              </router-link>
              <Button @click="deleteTransaction(t)" class="btn-delete bg-alert hover:bg-[#f72525] text-light">
                <slot name="del-btn">Delete</slot>
              </Button>
          </TableData>
        </TableRow>
      </TableBody>
      <TableBody v-else>
        <TableRow>
          <TableData class="text-gray-400 font-light text-center" colspan="5">no transactions found.</TableData>
        </TableRow>
      </TableBody>
    </Table>
</template>