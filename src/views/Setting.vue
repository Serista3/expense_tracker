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
import Modal from '@/components/common/Modal.vue';
import CategoryForm from '@/components/CategoryForm.vue';
import { PhFloppyDiskBack } from '@phosphor-icons/vue';
import { useCategories } from '@/composables/useCategories';
import { useTransaction } from '@/composables/useTransaction';
import { useUserData } from '@/composables/useUserData';
import { useModalScrollLock } from '@/composables/useModalScrollLock';
import { ref } from 'vue'

const { 
        categories, 
        isCreateCategoryModalVisible, 
        isDeleteCategoryModalVisible, 
        editCategoryData,
        delCategoryData,
        openModalCreateCategory, 
        closeModalCreateCategory, 
        createCategoryData, 
        updateCategoryData, 
        deleteCategoryData 
} = useCategories();
const { transactions } = useTransaction();
const { userAvatar, userName, userBudgets, saveUserData } = useUserData();
useModalScrollLock(isCreateCategoryModalVisible);
useModalScrollLock(isDeleteCategoryModalVisible);

const username = ref(userName.value)
const imgUrl = ref(userAvatar.value)
const curBudget = ref(Array.from(userBudgets.value).find(b => new Date().getMonth() === b.month && new Date().getFullYear() === b.year)?.amount ?? 1)

const budgets = ref(userBudgets.value)
const success = ref(false)
const isSaving = ref(false);
let notiTimeout = null;

const handleProfilesave = function(){
    isSaving.value = true;
    clearTimeout(notiTimeout);

    const newBudgets = [...budgets.value]
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const budgetIndex = newBudgets.findIndex(b => b.month === currentMonth && b.year === currentYear);

    if(budgetIndex === -1){
        newBudgets.push({ 'id': newBudgets.length + 1, 'month': currentMonth, 'year': currentYear, 'amount': Number(curBudget.value) });
    } else {
        newBudgets[budgetIndex].amount = Number(curBudget.value);
    }

    saveUserData({'username': username.value, 'imgUrl': imgUrl.value, 'budgets': newBudgets})
    isSaving.value = false;

    success.value = true;
    notiTimeout = setTimeout(() => success.value = false, 3000);
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
                    <FormField labelName="This Month's Budget">
                         <FormInput type="number" name="budget" placeholder="enter your budget." v-model="curBudget" :min="1" required />
                    </FormField>
                    <Button type="submit" :disabled="isSaving" :class="{'disabled' : isSaving}" class="btn-save bg-highlight hover:bg-[#4aba73] flex gap-4 justify-center items-center max-w-[12rem] mt-6">
                        {{ isSaving ? 'Saving...' : 'Save' }}
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
            <Button class="btn-add bg-highlight hover:bg-[#4aba73] self-end mb-4" @click="openModalCreateCategory">Add</Button>
            <div class="category__table overflow-y-scroll h-[30rem]">
                <Table>
                    <TableHeader>
                        <TableHead>Name</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead style="text-align: center;">Action</TableHead>
                    </TableHeader>
                    <TableBody v-if="categories.length">
                        <TableRow v-for="c in categories" :key="c.id">
                            <TableData>
                                <div class="tag inline-block px-4 py-1 rounded-xl text-light font-semibold" :style="{ backgroundColor: c.color }">{{ c.name }}</div>
                            </TableData>
                            <TableData>
                                {{ transactions.filter(t => t.category === c.name).length || 0 }}
                            </TableData>
                            <TableData class="flex justify-center items-center gap-8">
                                <Button class="btn-edit bg-warn hover:bg-[#f58f1b]" @click="openModalCreateCategory(c)">
                                    <slot name="edit-btn">Edit</slot>
                                </Button>
                                <Button class="btn-delete bg-alert hover:bg-[#f72525]" @click="delCategoryData = c, isDeleteCategoryModalVisible = true">
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
        <Transition name="noti-fade">
            <Notification v-if="success" class="fixed bottom-16 right-16 bg-highlight" message="Profile saved successfully!" />
        </Transition>
        <Modal v-model="isCreateCategoryModalVisible" nameModal="Category">
            <CategoryForm @submitCategory="(payload) => Boolean(editCategoryData.id) ? updateCategoryData(payload) : createCategoryData(payload)" @cancelCategory="closeModalCreateCategory" :editData="editCategoryData" />
        </Modal>
        <Modal v-model="isDeleteCategoryModalVisible" :nameModal="`Are you sure to delete ${delCategoryData?.name}?`">
            <div class="group-btn flex items-center justify-center gap-8">
                <Button @click="deleteCategoryData()" class="btn-yes bg-alert hover:bg-[#f72525]">Yes</Button>
                <Button @click="isDeleteCategoryModalVisible = false;" class="btn-no bg-dark hover:bg-[#363636]">No</Button>
            </div>
        </Modal>
    </MainLayout>
</template>

<style scoped>

.disabled {
    opacity: 0.7;
    cursor: default !important;
}

.noti-fade-enter-active,
.noti-fade-leave-active {
  transition: all 0.3s ease;
}

.noti-fade-enter-from,
.noti-fade-leave-to {
  opacity: 0;
  transform: translateY(1.5rem);
}

</style>