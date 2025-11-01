<script setup>
import { useUserData } from '@/composables/useUserData';

const { userAvatar, userName } = useUserData()

</script>

<template>
    <div class="user__profile flex items-center gap-2 pb-4 tablet:pb-5 laptop:pb-6 mb-8 tablet:mb-9 laptop:mb-10 border-b border-gray-300 dark:border-gray-600">
        <img :src="userAvatar" alt="user-avatar" class="user__profile-avatar w-[2.7rem] h-[2.7rem] tablet:w-[3.1rem] tablet:h-[3.1rem] laptop:w-[3.5rem] laptop:h-[3.5rem] border border-gray-300 dark:border-gray-600 object-cover rounded-[50%] mr-[0.25rem] tablet:mr-[0.375rem] laptop:mr-[0.5rem]" v-if="userAvatar" />
        <div class="user__avatar uppercase flex justify-center items-center text-[1.2rem] tablet:text-[1.4rem] laptop:text-[1.6rem] rounded-[50%] bg-dark text-light border dark:border-gray-600 font-semibold w-[2.7rem] h-[2.7rem] tablet:w-[3.1rem] tablet:h-[3.1rem] laptop:w-[3.5rem] laptop:h-[3.5rem] mr-[0.25rem] tablet:mr-[0.375rem] laptop:mr-[0.5rem]" v-else>{{ userName.toUpperCase().slice(0, 1) }}</div>
        <div class="user__profile-name text-[1.2rem] tablet:text-[1.4rem] laptop:text-[1.6rem]"> {{ userName }}</div>
    </div>
</template>