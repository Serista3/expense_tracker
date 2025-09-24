<script setup>
import { PhChartPie, PhArrowsLeftRight, PhGear } from '@phosphor-icons/vue';
import UserProfile from '@/components/userProfile.vue';
import SwitchMode from '@/components/layout/SwitchMode.vue';

const props = defineProps({
    curPath: String,
})

const classNavLink = 'nav__item flex items-center gap-5 hover:text-highlight transition-all cursor-pointer';

</script>

<template>
    <nav class="nav__sidebar pt-30 pb-40 pl-22 pr-32 h-screen border-r border-gray-300 dark:bg-dark dark:text-light sticky top-0 left-0">
        <UserProfile />
        <ul class="nav__list flex flex-col gap-10">
            <li>
                <router-link to="/" class="nav__link" id="Dashboard" :class="[classNavLink, { 'text-highlight': curPath === '/' }]">
                    <PhChartPie :size="24" />
                    Dashboard
                </router-link>
            </li>
            <li>
                <router-link to="/transaction" class="nav__link" id="transaction" :class="[classNavLink, { 'text-highlight': curPath === '/transaction' }]">
                    <PhArrowsLeftRight :size="24" />
                    Transaction
                </router-link>
            </li>
            <li>
                <router-link to="/setting" class="nav__link" id="setting" :class="[classNavLink, { 'text-highlight': curPath === '/setting' }]">
                    <PhGear :size="24" />
                    Setting
                </router-link>
            </li>
        </ul>
        <SwitchMode />
    </nav>
</template>