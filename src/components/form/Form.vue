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
  <form @submit.prevent="handleSubmit" class="form flex flex-col gap-8 max-w-[50rem] w-full">
    <slot></slot>
    <div class="form__button flex items-center justify-end gap-6 mt-14">
      <Button @click.prevent="handleCancel" className="btn-cancel bg-warn hover:bg-[#f58f1b]" btnName="Cancel" />
      <Button v-if="props.isEdit" type="submit" className="btn-save bg-highlight hover:bg-[#4aba73]" btnName="Save" />
      <Button v-else type="submit" className="btn-confirm bg-highlight hover:bg-[#4aba73]" :btnName="props.confirmText" />
    </div>
  </form>
</template>