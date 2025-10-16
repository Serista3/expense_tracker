<script setup>
import { useUserData } from '@/composables/useUserData';

const { userAvatar, userName } = useUserData()

</script>

<template>
    <div class="user__profile flex items-center gap-2 pb-6 mb-10 border-b border-gray-300">
        <img :src="userAvatar" alt="user-avatar" class="user__profile-avatar w-[3.5rem] h-[3.5rem] border border-gray-300 object-cover rounded-[50%] mr-2" v-if="userAvatar" />
        <div class="user__avatar uppercase text-2xl rounded-[50%] bg-dark text-light font-semibold px-4 py-2 mr-2" v-else>{{ userName.toUpperCase().slice(0, 1) }}</div>
        <div class="user__profile-name"> {{ userName }}</div>
    </div>
</template>