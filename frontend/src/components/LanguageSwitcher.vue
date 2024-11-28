<script setup>
import { useLanguage } from '@/utils/LanguageManager.js'
import { Globe } from 'lucide-vue-next'

const { currentLanguage, switchLanguage } = useLanguage()

const getButtonClass = () => ({
  'ring-2 ring-offset-2 ring-white dark:ring-gray-900': true,
})
</script>

<template>
  <div class="w-full space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
        Language:
        <span class="font-semibold text-primary capitalize">{{ currentLanguage }}</span>
      </span>
    </div>
    <div class="grid grid-cols-1 gap-2">
      <button
        class="w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        :class="getButtonClass()"
        @click="switchLanguage"
      >
        <Globe class="w-4 h-4 text-white mx-auto" />
      </button>
    </div>
  </div>
</template>