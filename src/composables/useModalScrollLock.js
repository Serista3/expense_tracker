import { watch } from "vue";
import { useToggleWithScrollLock } from "./useToggleWithScrollLock";

export function useModalScrollLock(isModalOpen) {
    const { lockDownScroll, unlockDownScroll } = useToggleWithScrollLock();

    // เมื่อ user เปิด modal ให้ lock scroll
    watch(isModalOpen, (newVal) => newVal ? lockDownScroll() : setTimeout(unlockDownScroll, 300));

    return {};
}