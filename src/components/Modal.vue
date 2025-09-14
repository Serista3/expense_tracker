<script setup>
import { computed } from 'vue';
import { closeModal, activeModal } from '@/composables/reuse';
import Form from './Form.vue';
import Button from './Button.vue';

const props = defineProps({
  typeModal: String,
})

const isModalActive = computed(() => activeModal.value === props.typeModal);

</script>

<template>
  <Transition>
    <div v-if="typeModal" 
        class="modal-background h-screen w-full bg-[rgba(0,0,0,0.3)] backdrop-blur-[1px] fixed top-0 left-0" 
        v-show="isModalActive" 
        @click="closeModal">
      <Transition name="fade">
        <div v-if="isModalActive"
            class="modal max-w-[40rem] w-full transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light p-14 shadow-lg rounded-[1rem]">
          <div v-if="props.typeModal === 'Add' || props.typeModal === 'Edit'">
            <h1 class="text-5xl font-semibold text-dark text-center mb-12">Transaction</h1>
            <Form />
          </div>
          <div v-else-if="props.typeModal === 'Delete'">
            <h2 class="text-center text-5xl text-dark font-semibold mb-14">Are you sure ?</h2>
            <div class="group-btn flex items-center justify-center gap-8">
              <Button className="btn-no bg-dark hover:bg-[#f58f1b]" btnName="No" />
              <Button className="btn-yes bg-alert hover:bg-[#f72525]" btnName="Yes" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

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