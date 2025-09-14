import Home from "@/views/Home.vue";
import Transaction from "@/views/Transaction.vue";
import EditTransaction from "@/views/EditTransaction.vue";
import CreateTransaction from "@/views/CreateTransaction.vue";
import Setting from "@/views/Setting.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', component: Home, name: 'Home'},
    { path: '/transaction', component: Transaction, name: 'Transaction' },
    { path: '/transaction/:id', component: EditTransaction, name: 'EditTransaction' },
    { path: '/createTransaction', component: CreateTransaction, name: 'CreateTransaction'},
    { path: '/setting', component: Setting, name: 'Setting' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;