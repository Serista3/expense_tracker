<script setup>
import { onMounted } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { curTheme, getTheme, changeTheme } = useTheme();

onMounted(() => getTheme());

</script>

<template>
    <div class="switch-mode mt-auto flex items-center gap-4">
        <div class="switch-mode__label text-[1.6rem] order-2">{{ curTheme === 'dark' ? 'Dark Mode' : 'Light Mode' }}</div>
        <button class="switch-mode__button dark:bg-dark dark:border-light dark:border-2 bg-light border-2 border-dark px-11 py-6 rounded-[50px] relative cursor-pointer" @click="changeTheme()">
            <div class="switch-mode__circle rounded-[50%] p-2 absolute top-1/2 -translate-y-1/2 transition-all bg-dark dark:bg-light dark:-translate-x-full translate-x-0">
                <svg v-if="curTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="w-[1.4rem] h-[1.4rem] fill-dark" viewBox="0 0 256 256">
                    <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"></path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-[1.4rem] h-[1.4rem] fill-light" fill="#000000" viewBox="0 0 256 256">
                    <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
                </svg>
            </div>
        </button>
    </div>
</template>