<script setup>
import Form from '../form/Form.vue';
import FormInput from '../form/FormInput.vue';
import Button from './Button.vue';
import { PhMagnifyingGlass } from '@phosphor-icons/vue';
import { ref } from 'vue';

const props = defineProps({
  initSearchVal: {
    type: String,
    default: '',
  }
})
const emit = defineEmits(['searchData'])
const searchValue = ref(props.initSearchVal)

const searchData = function(){
  emit('searchData', searchValue.value)
}

</script>

<template>
  <Form class="form__search bg-light overflow-hidden rounded-[.7rem] dark:text-light dark:bg-dark" @submit="searchData">
    <FormInput class="form__input-search" v-model="searchValue" type="text" name="search" placeholder="enter your title here."></FormInput>
    <template #action>
      <Button type="submit" class="btn-search text-light bg-dark hover:bg-[#474747] dark:border dark:border-gray-600 absolute top-0 right-0 h-full">
        <PhMagnifyingGlass class="text-[2rem] tablet:text-[2.2rem]" />
      </Button>
    </template>
  </Form>
</template>

<style scoped>

@media screen and (max-width: 480px), screen and (min-width: 480px) {
  .form__search {
    max-width: 100% !important;
  }

  .form__input-search {
    padding-right: 5rem !important;
  }
}

@media screen and (min-width: 900px) {
  .form__search {
    max-width: 40rem !important;
  }

  .form__input-search {
    padding-right: 8rem !important
  }
}

.btn-search {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

</style>