<template>
    <table>
        <tbody>
            <tr v-for="(row, rowIndex) in 5" :key="rowIndex">
                <td v-for="(col, colIndex) in 5" :key="colIndex" class="border border-gray-300 p-2">
                    Row {{ rowIndex + 1 }}, Col {{ colIndex + 1 }}
                </td>
            </tr>
        </tbody>
    </table>
</template>