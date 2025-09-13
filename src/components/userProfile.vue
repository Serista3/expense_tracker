<script setup>
import { ref } from 'vue';
import { PhUserCircle } from '@phosphor-icons/vue';

const userName = ref('');
const userAvatar = ref('');
</script>

<template>
    <div class="user__profile flex items-center gap-2 pb-6 mb-10 border-b border-gray-300">
        <img :src="userAvatar" alt="user-avatar" class="user__profile-avatar" v-if="userAvatar" />
        <PhUserCircle :size="32" v-else />
        <div class="user__profile-name"> {{ userName ? userName : 'User' }}</div>
    </div>
</template>