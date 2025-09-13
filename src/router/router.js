import Home from "@/views/Home.vue";
import Transaction from "@/views/Transaction.vue";
import Setting from "@/views/Setting.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', component: Home },
    { path: '/transaction', component: Transaction },
    { path: '/setting', component: Setting }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;