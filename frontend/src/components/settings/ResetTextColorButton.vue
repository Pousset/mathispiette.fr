<script setup>
import { useTextColor } from '@/utils/ButtonColorManager.js'

const { resetTextColor } = useTextColor()

const handleReset = () => {
  resetTextColor()
}
</script>

<template>
  <button
    @click="handleReset"
    class="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
  >
    Réinitialiser la couleur du texte
  </button>
</template>
