<script setup>
import { PhChartPie, PhArrowsLeftRight, PhGear } from '@phosphor-icons/vue';
import UserProfile from './userProfile.vue';
import SwitchMode from './SwitchMode.vue';

const props = defineProps({
    curPath: String,
})

const classNavLink = 'nav__item flex items-center gap-5 hover:text-highlight transition-all cursor-pointer';

</script>

<template>
    <nav class="nav__sidebar pt-18 pb-40 px-22 relative border-r border-gray-300 dark:bg-dark dark:text-light">
        <UserProfile />
        <ul class="nav__list flex flex-col gap-10">
            <li :class="[classNavLink, { 'text-highlight': curPath === '/' }]">
                <PhChartPie :size="24" />
                <router-link to="/" class="nav__link" id="home">Home</router-link>
            </li>
            <li :class="[classNavLink, { 'text-highlight': curPath === '/transaction' }]">
                <PhArrowsLeftRight :size="24" />
                <router-link to="/transaction" class="nav__link" id="transaction">Transaction</router-link>
            </li>
            <li :class="[classNavLink, { 'text-highlight': curPath === '/setting' }]">
                <PhGear :size="24" />
                <router-link to="/setting" class="nav__link" id="setting">Setting</router-link>
            </li>
        </ul>
        <SwitchMode />
    </nav>
</template>