<script setup>
import { ref, onMounted } from 'vue';

const curTheme = ref('light');

const changeTheme = function() {
    document.documentElement.classList.remove(curTheme.value === 'dark' ? 'dark' : 'light');
    curTheme.value = curTheme.value === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add(curTheme.value);

    localStorage.setItem('theme', JSON.stringify(curTheme.value));
}

const getTheme = function() {
    curTheme.value = JSON.parse(localStorage.getItem('theme'));
    document.documentElement.classList.add(curTheme.value || 'light');
}

onMounted(() => getTheme());

</script>

<template>
    <div class="switch-mode absolute bottom-8 right-8 flex items-center gap-4">
        <div class="switch-mode__label text-[1.4rem]">Switch Mode</div>
        <button class="switch-mode__button dark:bg-[#212121] dark:border-white dark:border-2 bg-white border-2 border-[#212121] px-10 py-5 rounded-[50px] relative cursor-pointer" @click="changeTheme()">
            <div class="switch-mode__circle rounded-[50%] p-4 absolute top-1/2 -translate-y-1/2 transition-all bg-[#212121] dark:bg-white dark:-translate-x-[110%] translate-x-[2px]"></div>
        </button>
    </div>
</template>