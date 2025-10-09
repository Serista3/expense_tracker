import { ref, watch } from 'vue'

export function useToggleWithScrollLock(){
  const isNav = ref(false)

  // เมื่อ user เปิด nav or modal ให้ lock scroll
  const lockDownScroll = function(){
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add('overflow-hidden')
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }

  const unlockDownScroll = function(){
    document.body.classList.remove('overflow-hidden')
    document.body.style.paddingRight = ''
  }

  const openNav = () => isNav.value = true;
  const closeNav = () => isNav.value = false;

  watch(isNav, (newVal) => newVal ? lockDownScroll() : unlockDownScroll())

  return { isNav, lockDownScroll, unlockDownScroll, openNav, closeNav }
}