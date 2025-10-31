<script setup>
import { PhX } from '@phosphor-icons/vue';

const props = defineProps({
  nameModal: String,
})

// ไว้เปิด/ปิด modal จากตัว parent
const activeModal = defineModel({
  type: Boolean,
  default: false
})

</script>

<template>
    <Transition name="modal-transition">
        <div v-if="activeModal" 
            class="modal-background h-screen w-full bg-[rgba(0,0,0,0.3)] backdrop-blur-[1px] fixed top-0 left-0 z-10 flex items-center justify-center" 
            @click.self="activeModal = false"> <div class="modal-content max-w-[30rem] tablet:max-w-[35rem] laptop:max-w-[40rem] w-full bg-light dark:bg-dark dark:text-light p-10 tablet:p-12 laptop:p-14 shadow-lg rounded-[1rem] relative">
                <h1 class="text-3xl laptop:text-4xl desktop:text-5xl font-semibold text-dark dark:text-light text-center mb-12 leading-[1.4]">{{ nameModal }}</h1>
                <slot></slot>
                <div class="close-modal cursor-pointer absolute top-8 right-8" @click="activeModal = false">
                    <PhX class="close-icon text-[1.4rem] tablet:text-[1.6rem] laptop:text-[1.8rem] desktop:text-[2rem]" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>

.modal-transition-enter-active,
.modal-transition-leave-active {
    transition: opacity 0.3s ease;
}

.modal-transition-enter-active .modal-content,
.modal-transition-leave-active .modal-content {
    transition: all 0.3s ease;
}


.modal-transition-enter-from,
.modal-transition-leave-to {
    opacity: 0;
}

.modal-transition-enter-from .modal-content,
.modal-transition-leave-to .modal-content {
    transform: translateY(3rem);
    opacity: 0;
}
</style>