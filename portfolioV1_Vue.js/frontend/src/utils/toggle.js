// frontend/src/utils/toggle.js
import { ref } from 'vue'

export const isOpen = ref(false)

export const toggle = () => {
  isOpen.value = !isOpen.value
}
