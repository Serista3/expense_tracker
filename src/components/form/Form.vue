<script setup>
import Button from '@/components/common/Button.vue'

const props = defineProps({
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = function() {
  emit('submit')
}

const handleCancel = function(){
  emit('cancel')
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="form flex flex-col gap-8 max-w-[50rem] w-full relative">
    <slot></slot>
    <slot name="action">
      <div class="form__button flex items-center justify-end gap-6 mt-14">
        <Button @click.prevent="handleCancel" class="btn-cancel bg-warn hover:bg-[#f58f1b]">Cancel</Button>
        <Button v-if="props.isEdit" type="submit" class="btn-save bg-highlight hover:bg-[#4aba73]">Save</Button>
        <Button v-else type="submit" class="btn-confirm bg-highlight hover:bg-[#4aba73]">{{ props.confirmText }}</Button>
      </div>
    </slot>
  </form>
</template>