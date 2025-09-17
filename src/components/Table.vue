<script setup>
import Button from './Button.vue';
import { exData } from '@/composables/initial';

</script>

<template>
    <table class="table border-collapse w-full mb-20">
        <tbody>
            <tr v-if="exData" v-for="data in exData" :key="data.id" class="row border-y border-gray-300">
                <td class="p-4">{{ data.title }}</td>
                <td class="p-4">
                    <div class="tag inline-block px-4 py-1 rounded-xl text-light bg-dark">{{ data.category }}</div>
                </td>
                <td class="p-4">{{ data.date }}</td>
                <td class="p-4 font-semibold" :class="{'text-highlight' : data.type === 'income', 'text-alert' : data.type === 'expense'}">
                    {{ data.type === 'income' ? `+${data.amount}` : `-${data.amount}` }} THB
                </td>
                <td class="p-4 flex justify-center items-center gap-8">
                    <router-link :to="{name: 'EditTransaction', params: {id : data.id}}"><Button className="btn-edit bg-warn hover:bg-[#f58f1b]" btnName="Edit" /></router-link>
                    <Button className="btn-delete bg-alert hover:bg-[#f72525]" btnName="Delete" />
                </td>
            </tr>
            <tr v-else class="row border-y border-gray-300 p-4">
                <td class="p-4 text-gray-400 font-light text-center" colspan="5">no data.</td>
            </tr>
        </tbody>
    </table>
</template>