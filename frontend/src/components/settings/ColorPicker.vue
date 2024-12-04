<script setup>
import { CheckIcon } from 'lucide-vue-next'
import colors from 'tailwindcss/colors'
import {
  validColors as textValidColors,
  useTextColor,
} from '@/utils/ButtonColorManager.js'
import {
  validColors as buttonValidColors,
  useButtonColor,
} from '@/utils/ButtonColorManager.js'

const { selectedColor: selectedTextColor, setTextColor } = useTextColor()
const { selectedColor: selectedButtonColor, setButtonColor } = useButtonColor()

const getButtonClass = (color, selectedColor) => ({
  'ring-2 ring-offset-2 ring-white dark:ring-gray-900': color === selectedColor,
})

const displayColor = color => {
  return color.charAt(0).toUpperCase() + color.slice(1)
}
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Text Color Picker -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Text Color:
          <span class="font-semibold text-primary capitalize">{{
            displayColor(selectedTextColor)
          }}</span>
        </span>
      </div>
      <div class="grid grid-cols-8 gap-2">
        <button
          v-for="color in textValidColors"
          :key="color"
          class="w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          :class="getButtonClass(color, selectedTextColor)"
          :style="{ backgroundColor: colors[color][500] }"
          @click="() => setTextColor(color)"
        >
          <CheckIcon
            v-if="color === selectedTextColor"
            class="w-3 h-3 text-white mx-auto"
          />
        </button>
      </div>
    </div>

    <!-- Button Color Picker -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Button Color:
          <span class="font-semibold text-primary capitalize">{{
            displayColor(selectedButtonColor)
          }}</span>
        </span>
      </div>
      <div class="grid grid-cols-8 gap-2">
        <button
          v-for="color in buttonValidColors"
          :key="color"
          class="w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          :class="getButtonClass(color, selectedButtonColor)"
          :style="{ backgroundColor: colors[color][500] }"
          @click="() => setButtonColor(color)"
        >
          <CheckIcon
            v-if="color === selectedButtonColor"
            class="w-3 h-3 text-white mx-auto"
          />
        </button>
      </div>
    </div>
  </div>
</template>
