<script setup>
import Modal from '@/components/common/Modal.vue';
import Button from '@/components/common/Button.vue';
</script>

<template>
    <Modal v-model="isDeleteModalVisible" nameModal="Are you sure?">
        <div class="group-btn flex items-center justify-center gap-8">
            <Button @click="confirmDelTransaction" class="btn-yes bg-alert hover:bg-[#f72525]">Yes</Button>
            <Button @click="isDeleteModalVisible = false;" class="btn-no bg-dark hover:bg-[#363636]">No</Button>
        </div>
    </Modal>
</template>