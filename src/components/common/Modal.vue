<script setup>
import { PhX } from '@phosphor-icons/vue';

const props = defineProps({
  nameModal: String,
})

const activeModal = defineModel({
  type: Boolean,
  default: false
})

</script>

<template>
    <Transition name="modal-transition">
        <div v-if="activeModal" 
            class="modal-background h-screen w-full bg-[rgba(0,0,0,0.3)] backdrop-blur-[1px] fixed top-0 left-0 z-10 flex items-center justify-center" 
            @click.self="activeModal = false"> <div class="modal-content max-w-[40rem] w-full bg-light p-14 shadow-lg rounded-[1rem] relative">
                <h1 class="text-5xl font-semibold text-dark text-center mb-12">{{ nameModal }}</h1>
                <slot></slot>
                <div class="close-modal cursor-pointer absolute top-8 right-8" @click="activeModal = false">
                    <PhX :size="20" />
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