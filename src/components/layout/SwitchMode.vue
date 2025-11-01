<script setup>
import { onMounted } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { getTheme, changeTheme } = useTheme();

onMounted(() => getTheme());

</script>

<template>
    <div class="switch-mode absolute bottom-26 right-6 tablet:bottom-27 tablet:right-7 laptop:bottom-28 laptop:right-8 flex items-center gap-4">
        <div class="switch-mode__label text-[1rem] tablet:text-[1.2rem] laptop:text-[1.4rem]">Switch Mode</div>
        <button class="switch-mode__button dark:bg-dark dark:border-light dark:border-2 bg-light border-2 border-dark px-10 py-5 rounded-[50px] relative cursor-pointer" @click="changeTheme()">
            <div class="switch-mode__circle rounded-[50%] p-4 absolute top-1/2 -translate-y-1/2 transition-all bg-dark dark:bg-light dark:-translate-x-[110%] translate-x-[2px]"></div>
        </button>
    </div>
</template>