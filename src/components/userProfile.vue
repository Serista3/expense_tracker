<script setup>
import { useUserData } from '@/composables/useUserData';

const { userAvatar, userName } = useUserData()

</script>

<template>
    <div class="user__profile flex items-center gap-2 pb-6 mb-10 border-b border-gray-300 dark:border-gray-600">
        <img :src="userAvatar" alt="user-avatar" class="user__profile-avatar w-[3.5rem] h-[3.5rem] border border-gray-300 dark:border-gray-600 object-cover rounded-[50%] mr-[0.5rem]" v-if="userAvatar" />
        <div class="user__avatar uppercase flex justify-center items-center text-[1.6rem] rounded-[50%] bg-dark text-light border dark:border-gray-600 font-semibold w-[3.5rem] h-[3.5rem] mr-[0.5rem]" v-else>{{ userName.toUpperCase().slice(0, 1) }}</div>
        <div class="user__profile-name text-[1.6rem]"> {{ userName }}</div>
    </div>
</template>