<script setup>
import { ref } from 'vue';
import Button from './Button.vue';

const exData = ref(
    [
            {
                "id": 1,
                "title": "Grocery Shopping",
                "description": ".............",
                "type": "expense",
                "category": "Food",
                "amount": -50.75,
                "date": "2024-06-01"
            },
            {
                "id": 2,
                "title": "Salary",
                "description": ".............",
                "type": "income",
                "category": "Salary",
                "amount": 1500.00,
                "date": "2024-06-05"
            },
    ]
)

</script>

<template>
    <table class="table border-collapse w-full mb-20">
        <tbody>
            <tr v-for="data in exData" :key="data.id" class="row border-y border-gray-300">
                <td class="p-4">{{ data.title }}</td>
                <td class="p-4">
                    <div class="tag inline-block px-4 py-1 rounded-xl text-light bg-dark">{{ data.category }}</div>
                </td>
                <td class="p-4">{{ data.date }}</td>
                <td class="p-4 font-semibold" :class="{'text-highlight' : data.type === 'income', 'text-alert' : data.type === 'expense'}">{{ data.amount }} THB</td>
                <td class="p-4 flex justify-center items-center gap-8">
                    <Button className="btn-edit bg-warn hover:bg-[#f58f1b]" btnName="Edit" />
                    <Button className="btn-delete bg-alert hover:bg-[#f72525]" btnName="Delete" />
                </td>
            </tr>
        </tbody>
    </table>
</template>