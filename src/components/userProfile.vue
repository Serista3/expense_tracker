<script setup>
import { ref } from 'vue';

const userName = ref('');
const userAvatar = ref('');
</script>

<template>
    <div class="user__profile flex items-center gap-2 pb-6 mb-10 border-b border-gray-300">
        <img :src="userAvatar" alt="user-avatar" class="user__profile-avatar" v-if="userAvatar" />
        <div class="user__avatar uppercase text-2xl rounded-[50%] bg-dark text-light font-semibold px-4 py-2 mr-2" v-else>{{ userName || 'u' }}</div>
        <div class="user__profile-name"> {{ userName || 'User' }}</div>
    </div>
</template>