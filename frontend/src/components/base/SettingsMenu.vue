<script setup>
import { onMounted, onUnmounted } from 'vue'
import { Palette } from 'lucide-vue-next'
import ThemeSwitcher from '../settings/ThemeSwitcher.vue'
import ButtonColorPicker from '../settings/ColorPicker.vue'
import ResetTextColorButton from '../settings/ResetTextColorButton.vue'
import ScrollBarToggle from '../settings/ScrollBarToggle.vue'
// import SlideButton from '@/components/ui/SlideButton.vue'
import { isOpen, toggle } from '../../utils/toggle.js'

const closePopover = event => {
  if (
    isOpen.value &&
    !event.target.closest('.theme-customizer-button') &&
    !event.target.closest('.theme-customizer-popover')
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closePopover)
})

onUnmounted(() => {
  document.removeEventListener('click', closePopover)
})
</script>

<template>
  <div class="relative">
    <button
      class="theme-customizer-button fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      @click.stop="toggle"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <Palette class="w-9 h-9" />
    </button>
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          class="theme-customizer-popover fixed bottom-20 right-4 w-72 rounded-2xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="theme-menu"
        >
          <div class="p-4 space-y-6" role="none">
            <div>
              <ScrollBarToggle />
            </div>
            <div>
              <ThemeSwitcher />
            </div>
            <div>
              <ButtonColorPicker />
            </div>
           
            <div>
              <ResetTextColorButton />
            </div>
    
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
