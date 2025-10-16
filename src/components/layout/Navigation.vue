<script setup>
import { PhChartPie, PhArrowsLeftRight, PhGear, PhX } from '@phosphor-icons/vue';
import UserProfile from '@/components/userProfile.vue';
import SwitchMode from '@/components/layout/SwitchMode.vue';

const props = defineProps({
    curPath: String,
    activeNav: {
        type: Boolean,
        default: false,
    }
})

const classNavLink = 'nav__item flex items-center gap-5 hover:text-highlight transition-all cursor-pointer';

const emit = defineEmits(['closeNav'])

</script>

<template>
    <div @click.self="emit('closeNav')" :class="{'visible' : activeNav, 'invisible': !activeNav}" class="nav__bg backdrop-blur-[1px] bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 w-full h-screen z-10">
        <nav :class="{'translate-x-[0]' : activeNav, '-translate-x-[100%]' : !activeNav}" class="nav__sidebar pt-30 pb-40 pl-22 pr-32 max-w-[35rem] w-full h-screen border-r border-gray-300 dark:border-gray-600 bg-light dark:bg-dark dark:text-light fixed top-0 left-0 z-20 transition-all">
            <PhX @click.self="emit('closeNav')" :size="18" class="close-nav cursor-pointer absolute text-gray-400 top-8 right-8 hover:text-dark dark:hover:text-gray-300 transition-all" />
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
    </div>
    
</template>