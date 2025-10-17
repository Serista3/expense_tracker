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
import { useLocalStorage } from '@/composables/useLocalStorage';
import { nextTick, ref, useTemplateRef } from 'vue'

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
const { removeDataFromLocalStorage, updateDataToLocalStorage } = useLocalStorage();
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

const inputImportFile = useTemplateRef('input-import-file');
const isFileLoaded = ref(false);
let loadFileTimeout = null;

// นำเข้าข้อมูลจากไฟล์ที่เป็น JSON
const importData = function(){
    clearTimeout(loadFileTimeout);
    inputImportFile.value.value = null;
    
    inputImportFile.value.click();
    const reader = new FileReader();

    inputImportFile.value.addEventListener('change', () => {
        if(!inputImportFile.value.files.length) return;

        reader.addEventListener('load', () => {
            try {
                const [ data ] = JSON.parse(reader.result);
                if(!data) throw new Error('No data found in file');
                
                transactions.value = data.transactions ?? [];
                categories.value = data.categories ?? [];

                saveUserData(data.userData ?? { username: 'User', imgUrl: '', budgets: [] });

                // ข้อมูลใส่ form
                username.value = userName.value;
                imgUrl.value = userAvatar.value;
                budgets.value = userBudgets.value;
                curBudget.value = Array.from(userBudgets.value).find(b => new Date().getMonth() === b.month && new Date().getFullYear() === b.year)?.amount ?? 1;
                
                updateDataToLocalStorage('transactions', transactions.value);
                updateDataToLocalStorage('categories', categories.value);
            } catch (error){
                console.error('Error import data: file is not a valid JSON');
            } finally {
                isFileLoaded.value = true;
                loadFileTimeout = setTimeout(() => isFileLoaded.value = false, 3000);
            }
        })
        
        reader.readAsText(inputImportFile.value.files[0]);
    })
}

const urlData = ref(null);
const downloadLink = useTemplateRef('downloadLink');

// ส่งข้อมูลทั้งหมดไปเป็นไฟล์ JSON
const exportData = async function(){
    const data = JSON.stringify([{
        userData: {
            username: userName.value,
            imgUrl: userAvatar.value,
            budgets: userBudgets.value
        },
        categories: categories.value,
        transactions: transactions.value
    }], null, '\t');
    
    const blob = new Blob([data], { type: 'application/json'} );
    urlData.value = URL.createObjectURL(blob);
    
    // ให้ vue render element ให้เสร็จก่อน แล้วค่อยกด link เพื่อโหลดไฟล์
    await nextTick();
    downloadLink.value.click();

    URL.revokeObjectURL(urlData.value);
    urlData.value = null;
}

const isClearAllDataModalVisible = ref(false);
useModalScrollLock(isClearAllDataModalVisible);

// ลบข้อมูลทั้งหมด categories และ transactions
const clearAllData = function(){
    transactions.value = [];
    categories.value = [];
    userName.value = 'User';
    userAvatar.value = '';
    userBudgets.value = [];

    // reset form
    username.value = 'User';
    imgUrl.value = '';
    curBudget.value = 1;
    budgets.value = [];

    removeDataFromLocalStorage('transactions');
    removeDataFromLocalStorage('categories');
    removeDataFromLocalStorage('userData');

    isClearAllDataModalVisible.value = false;
}

</script>

<template>
    <MainLayout class="setting-page">
        <h1 class="text-6xl font-semibold mb-14 text-center">Setting</h1>
        <div class="general mb-30 flex flex-col justify-center items-center">
            <h2 class="general__title mb-14 text-[2.4rem] font-semibold">General</h2>
            <div class="general__content flex gap-20 justify-center items-center w-full">
                <img class="general__img-preview w-[30rem] h-[30rem] object-cover rounded-[50%] border border-gray-300 dark:border-gray-600" :src="imgUrl" alt="preview-img" v-if="imgUrl" />
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
                    <Button type="submit" :disabled="isSaving" :class="{'disabled' : isSaving}" class="btn-save text-light bg-highlight hover:bg-[#4aba73] flex gap-4 justify-center items-center max-w-[12rem] mt-6">
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
            <Button class="btn-add text-light bg-highlight hover:bg-[#4aba73] self-end mb-4" @click="openModalCreateCategory">Add</Button>
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
                                <div class="tag inline-block px-4 py-1 rounded-xl text-light font-semibold dark:border dark:border-gray-600" :style="{ backgroundColor: c.color }">{{ c.name }}</div>
                            </TableData>
                            <TableData>
                                {{ transactions.filter(t => t.category === c.name).length || 0 }}
                            </TableData>
                            <TableData class="flex justify-center items-center gap-8" v-if="c.name !== 'Uncategorized'">
                                <Button class="btn-edit text-light bg-warn hover:bg-[#f58f1b]" @click="openModalCreateCategory(c)">
                                    <slot name="edit-btn">Edit</slot>
                                </Button>
                                <Button class="btn-delete text-light bg-alert hover:bg-[#f72525]" @click="delCategoryData = c, isDeleteCategoryModalVisible = true">
                                    <slot name="del-btn">Delete</slot>
                                </Button>
                            </TableData>
                            <TableData class="text-center text-gray-400 font-light" v-else>Default</TableData>
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
        <div class="data-management max-w-[40rem] mx-auto">
            <h2 class="data__title mb-8 text-[2.4rem] font-semibold text-center">Data Management</h2>
            <div class="data__content flex flex-col justify-center items-start gap-8">
                <div class="data__import flex justify-center items-center gap-6">
                    <input type="file" name="importFile" id="importFile" class="hidden" ref="input-import-file" accept="application/json">
                    <Button @click="importData" class="btn-import text-light bg-dark hover:bg-gray-700 dark:border dark:border-gray-600">Import</Button>
                    <div class="text-[1.2rem] text-gray-400 font-light mt-2">import all data from a json file.</div>
                </div>
                <div class="data__export flex justify-center items-center gap-6">
                    <a v-if="urlData" :href="urlData" download="data.json" class="hidden" ref="downloadLink"></a>
                    <Button @click="exportData" class="btn-export text-light bg-gray-500 hover:bg-gray-600">Export</Button>
                    <div class="text-[1.2rem] text-gray-400 font-light mt-2">export all data to a json file.</div>
                </div>
                <div class="data__clear flex justify-center items-center gap-6">
                    <Button @click="isClearAllDataModalVisible = true;" class="btn-clear text-light bg-alert hover:bg-[#f72525]">Clear all data</Button>
                    <div class="text-[1.2rem] text-gray-400 font-light mt-2">clear all data.</div>
                </div>
            </div>
        </div>
        <Transition name="noti-fade">
            <Notification v-if="success" class="fixed bottom-16 right-16 bg-highlight" message="Profile saved successfully!" />
        </Transition>
        <Modal v-model="isCreateCategoryModalVisible" nameModal="Category">
            <CategoryForm @submitCategory="(payload) => Boolean(editCategoryData.id) ? updateCategoryData(payload) : createCategoryData(payload)" @cancelCategory="closeModalCreateCategory" :editData="editCategoryData" />
        </Modal>
        <Modal v-model="isDeleteCategoryModalVisible" :nameModal="`Delete category`">
            <p class="text-gray-400 text-center font-light mt-[-1rem]">You are going to delete this category.<br/> Are you sure to delete <span class="font-semibold text-alert">{{ delCategoryData?.name }} ?</span></p>
            <div class="group-btn flex items-center justify-center gap-8 mt-20">
                <Button @click="deleteCategoryData()" class="btn-yes text-light bg-alert hover:bg-[#f72525]">Confirm</Button>
                <Button @click="isDeleteCategoryModalVisible = false;" class="btn-no text-light bg-dark hover:bg-[#363636] dark:border dark:border-gray-600">Cancel</Button>
            </div>
        </Modal>
        <Transition name="noti-fade">
            <Notification v-if="isFileLoaded" class="fixed bottom-16 right-16 bg-highlight" message="File loaded successfully!" />
        </Transition>
        <Modal v-model="isClearAllDataModalVisible" :nameModal="`Clear all data?`">
            <p class="text-gray-400 text-center font-light mt-[-1rem]"><span class="font-semibold text-alert">This can't restore it.</span> Export your data first if you want to keep it.</p>
            <div class="group-btn flex items-center justify-center gap-8 mt-20">
                <Button @click="clearAllData" class="btn-yes text-light bg-alert hover:bg-[#f72525]">Confirm</Button>
                <Button @click="isClearAllDataModalVisible = false;" class="btn-no text-light bg-dark hover:bg-[#363636] dark:border dark:border-gray-600">Cancel</Button>
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