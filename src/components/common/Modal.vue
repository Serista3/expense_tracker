<script setup>
import { closeModal, activeModal } from '@/composables/reuse';
import { PhX } from '@phosphor-icons/vue';

const props = defineProps({
  nameModal: String,
})

</script>

<template>
  <Transition>
    <div v-if="activeModal" 
        class="modal-background h-screen w-full bg-[rgba(0,0,0,0.3)] backdrop-blur-[1px] fixed top-0 left-0 z-10" 
        @click="closeModal">
      <Transition name="fade">
        <div v-if="activeModal" class="modal max-w-[40rem] w-full transition-all z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light p-14 shadow-lg rounded-[1rem]">
          <h1 class="text-5xl font-semibold text-dark text-center mb-12">{{ props.nameModal }}</h1>
          <slot></slot>
          <div class="close-modal cursor-pointer absolute top-8 right-8" @click="activeModal = false">
            <PhX :size="20" />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<!--      <div v-else-if="props.typeModal === 'Delete'">
            <h2 class="text-center text-5xl text-dark font-semibold mb-14">Are you sure ?</h2>
            <div class="group-btn flex items-center justify-center gap-8">
              <Button className="btn-no bg-dark hover:bg-[#f58f1b]" btnName="No" />
              <Button className="btn-yes bg-alert hover:bg-[#f72525]" btnName="Yes" />
            </div>
          </div> -->
<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(3rem);
}

</style>