<script setup>
import { CheckIcon } from 'lucide-vue-next';
import colors from 'tailwindcss/colors';
import { ref} from 'vue';

const validColors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
];

const DEFAULT_COLOR = 'yellow';

const selectedGreetingColor = ref(localStorage.getItem('greetingColor') || DEFAULT_COLOR);
const selectedNameColor = ref(localStorage.getItem('nameColor') || DEFAULT_COLOR);
const selectedTitleColor = ref(localStorage.getItem('titleColor') || DEFAULT_COLOR);
const selectedSubtitleColor = ref(localStorage.getItem('subtitleColor') || DEFAULT_COLOR);

const applyColor = (element, colorName) => {
  if (!validColors.includes(colorName)) {
    console.warn(`Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`);
    colorName = DEFAULT_COLOR;
  }
  localStorage.setItem(`${element}Color`, colorName);
  document.documentElement.style.setProperty(`--${element}-color`, colors[colorName][500]);
  document.querySelectorAll(`.${element}`).forEach(el => {
    el.style.setProperty('color', colors[colorName][500], 'important');
  });
  console.log(`Applied ${colorName} to ${element}`);
};

const setGreetingColor = (colorName) => {
  selectedGreetingColor.value = colorName;
  applyColor('greeting', colorName);
};

const setNameColor = (colorName) => {
  selectedNameColor.value = colorName;
  applyColor('name', colorName);
};

const setTitleColor = (colorName) => {
  selectedTitleColor.value = colorName;
  applyColor('title', colorName);
};

const setSubtitleColor = (colorName) => {
  selectedSubtitleColor.value = colorName;
  applyColor('subtitle', colorName);
};

const getButtonClass = (color, selectedColor) => ({
  'ring-2 ring-offset-2 ring-white dark:ring-gray-900': color === selectedColor,
});

const displayColor = (color) => {
  return color.charAt(0).toUpperCase() + color.slice(1);
};
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Greeting Color Picker -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Greeting Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedGreetingColor) }}
          </span>
        </span>
      </div>
      <div class="grid grid-cols-8 gap-2">
        <button
          v-for="color in validColors"
          :key="color"
          class="w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          :class="getButtonClass(color, selectedGreetingColor)"
          :style="{ backgroundColor: colors[color][500] }"
          @click="() => setGreetingColor(color)"
        >
          <CheckIcon
            v-if="color === selectedGreetingColor"
            class="w-3 h-3 text-white mx-auto"
          />
        </button>
      </div>
    </div>

    <!-- Name Color Picker -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Name Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedNameColor) }}
          </span>
        </span>
      </div>
      <div class="grid grid-cols-8 gap-2">
        <button
          v-for="color in validColors"
          :key="color"
          class="w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          :class="getButtonClass(color, selectedNameColor)"
          :style="{ backgroundColor: colors[color][500] }"
          @click="() => setNameColor(color)"
        >
          <CheckIcon
            v-if="color === selectedNameColor"
            class="w-3 h-3 text-white mx-auto"
          />
        </button>
      </div>
    </div>

    <!-- Title Color Picker -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Title Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedTitleColor) }}
          </span>
        </span>
      </div>
      <div class="grid grid-cols-8 gap-2">
        <button
          v-for="color in validColors"
          :key="color"
          class="w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          :class="getButtonClass(color, selectedTitleColor)"
          :style="{ backgroundColor: colors[color][500] }"
          @click="() => setTitleColor(color)"
        >
          <CheckIcon
            v-if="color === selectedTitleColor"
            class="w-3 h-3 text-white mx-auto"
          />
        </button>
      </div>
    </div>

    <!-- Subtitle Color Picker -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Subtitle Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedSubtitleColor) }}
          </span>
        </span>
      </div>
      <div class="grid grid-cols-8 gap-2">
        <button
          v-for="color in validColors"
          :key="color"
          class="w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          :class="getButtonClass(color, selectedSubtitleColor)"
          :style="{ backgroundColor: colors[color][500] }"
          @click="() => setSubtitleColor(color)"
        >
          <CheckIcon
            v-if="color === selectedSubtitleColor"
            class="w-3 h-3 text-white mx-auto"
          />
        </button>
      </div>
    </div>
  </div>
</template>
