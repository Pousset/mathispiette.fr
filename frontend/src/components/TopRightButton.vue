<script setup>
import { computed } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import { Theme, useTheme } from '@/utils/themeManager.js'

const { setTheme, effectiveTheme } = useTheme()

const toggleTheme = () => {
  setTheme(effectiveTheme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK)
}

const icon = computed(() => (effectiveTheme.value === Theme.DARK ? Sun : Moon))
</script>

<template>
  <div class="relative">
    <button
      class="theme-customizer-button fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      @click="toggleTheme"
      aria-haspopup="true"
    >
      <component :is="icon" class="w-6 h-6" />
    </button>
  </div>
</template>
