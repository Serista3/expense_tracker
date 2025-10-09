<script setup>
import MainLayout from '@/components/layout/MainLayout.vue';
import Form from '@/components/form/Form.vue';
import FormField from '@/components/form/FormField.vue';
import FormInput from '@/components/form/FormInput.vue';
import Button from '@/components/common/Button.vue';
import Table from '@/components/table/Table.vue';
import TableHeader from '@/components/table/TableHeader.vue';
import TableHead from '@/components/table/TableHead.vue';
import TableBody from '@/components/table/TableBody.vue';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';
import Notification from '@/components/common/Notification.vue';
import { PhFloppyDiskBack } from '@phosphor-icons/vue';
import { useCategories } from '@/composables/useCategories';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useUserData } from '@/composables/useUserData';
import { ref } from 'vue'

const { categories } = useCategories()
const { updateDataToLocalStorage } = useLocalStorage();
const { userAvatar, userName, userCurrency } = useUserData();

const username = ref(userName.value)
const imgUrl = ref(userAvatar.value)
const currency = ref(userCurrency.value)
const budget = ref(1)

const success = ref(false)
const currencies = ref(['THB', 'USD'])

const handleProfilesave = function(){
    const userData = {'username': username.value, 'imgUrl': imgUrl.value, 'currency': currency.value}
    updateDataToLocalStorage('userData', userData)

    userAvatar.value = imgUrl.value
    userName.value = username.value
    userCurrency.value = currency.value

    success.value = true

    setTimeout(() => success.value = false, 3000)
}

</script>

<template>
    <MainLayout class="setting-page">
        <h1 class="text-6xl font-semibold mb-14 text-center">Setting</h1>
        <div class="general mb-30 flex flex-col justify-center items-center">
            <h2 class="general__title mb-14 text-[2.4rem] font-semibold">General</h2>
            <div class="general__content flex gap-20 justify-center items-center w-full">
                <img class="general__img-preview w-[30rem] h-[30rem] object-cover rounded-[50%]" :src="imgUrl" alt="preview-img" v-if="imgUrl" />
                <div class="preview-img w-[30rem] h-[30rem] bg-gray-300 rounded-[50%]" v-else></div>
                <Form class="general__form" @submit="handleProfilesave">
                    <FormField labelName="Username">
                         <FormInput type="text" name="username" placeholder="enter your username." v-model="username" />
                    </FormField>
                    <FormField labelName="Url Image">
                         <FormInput type="text" name="imgurl" placeholder="enter your image url." v-model="imgUrl" />
                    </FormField>
                    <FormField labelName="Currency">
                        <el-select v-model="currency" placeholder="select your currency" style="width: 40%">
                            <el-option
                            v-for="(c, index) in currencies"
                            :key="index"
                            :label="c"
                            :value="c"
                            />
                        </el-select>
                    </FormField>
                    <Button type="submit" class="btn-save bg-highlight hover:bg-[#4aba73] flex gap-4 justify-center items-center max-w-[12rem] mt-6">
                        Save
                        <PhFloppyDiskBack :size="20" weight="fill" />
                    </Button>
                    <template #action>
                        <div class="hidden"></div>
                    </template>
                </Form>
            </div>
        </div>
        <div class="budget mb-30">
            <h2 class="budget__title mb-8 text-[2.4rem] font-semibold text-center">Budget</h2>
            <div class="budget__content flex justify-center items-center">
                <Form class="general__form">
                    <FormField labelName="Monthly budget">
                         <FormInput type="number" name="budget" placeholder="enter your budget." v-model="budget" :min="1" />
                    </FormField>
                    <Button class="btn-save mx-auto bg-highlight hover:bg-[#4aba73] flex gap-4 justify-center items-center max-w-[12rem] mt-6">
                        Save
                        <PhFloppyDiskBack :size="20" weight="fill" />
                    </Button>
                    <template #action>
                        <div class="hidden"></div>
                    </template>
                </Form>
            </div>
        </div>
        <div class="category-management mb-30 max-w-[70rem] mx-auto flex flex-col">
            <h2 class="category__title mb-8 text-[2.4rem] font-semibold text-center">Category Management</h2>
            <Button class="btn-add bg-highlight hover:bg-[#4aba73] self-end mb-4">Add</Button>
            <div class="category__table overflow-y-scroll h-[30rem]">
                <Table>
                    <TableHeader>
                        <TableHead>Name</TableHead>
                        <TableHead style="text-align: center;">Action</TableHead>
                    </TableHeader>
                    <TableBody v-if="categories.length">
                        <TableRow v-for="c in categories" :key="c.id">
                            <TableData>
                                <div class="tag inline-block px-4 py-1 rounded-xl text-light font-semibold" :style="{ backgroundColor: c.color }">{{ c.name }}</div>
                            </TableData>
                            <TableData class="flex justify-center items-center gap-8">
                                <Button class="btn-edit bg-warn hover:bg-[#f58f1b]">
                                    <slot name="edit-btn">Edit</slot>
                                </Button>
                                <Button class="btn-delete bg-alert hover:bg-[#f72525]">
                                    <slot name="del-btn">Delete</slot>
                                </Button>
                            </TableData>
                        </TableRow>
                    </TableBody>
                    <TableBody v-else>
                        <TableRow>
                            <TableData class="text-gray-400 font-light text-center" colspan="5">no categories found.</TableData>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            
        </div>
        <div class="data-management">
            <h2 class="data__title mb-8 text-[2.4rem] font-semibold text-center">Data Management</h2>
            <div class="data__content flex justify-center items-center gap-8">
                <Button class="btn-import bg-dark hover:bg-gray-700">Import</Button>
                <Button class="btn-export bg-gray-500 hover:bg-gray-600">Export</Button>
                <Button class="btn-clear bg-alert hover:bg-[#f72525]">Clear all data</Button>
            </div>
        </div>
    </MainLayout>
    <Notification 
        class="fixed bottom-16 right-16" 
        message="Your data has saved in localstorage."
        :class="{'bg-highlight opacity-100 visible -translate-y-6': success, 'opacity-0 invisible translate-y-[0]' : !success}"/>
</template>