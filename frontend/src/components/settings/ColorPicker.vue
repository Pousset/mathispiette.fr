<script setup>
import { CheckIcon } from 'lucide-vue-next'
import colors from 'tailwindcss/colors'
import { ref } from 'vue'
import { validColors, useButtonColor } from '../../utils/ButtonColorManager.js'

// Définition de la couleur par défaut
const DEFAULT_COLOR = 'yellow'

// Références réactives pour les couleurs sélectionnées
const selectedGreetingColor = ref(
  localStorage.getItem('greetingColor') || DEFAULT_COLOR,
)
const selectedNameColor = ref(
  localStorage.getItem('nameColor') || DEFAULT_COLOR,
)
const selectedTitleColor = ref(
  localStorage.getItem('titleColor') || DEFAULT_COLOR,
)
const selectedSubtitleColor = ref(
  localStorage.getItem('subtitleColor') || DEFAULT_COLOR,
)

// Utilisation du gestionnaire de couleur de bouton
const { selectedColor: selectedButtonColor, setColor: setButtonColor } =
  useButtonColor()

// Fonction pour appliquer une couleur à un élément
const applyColor = (element, colorName) => {
  if (!validColors.includes(colorName)) {
    console.warn(
      `Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`,
    )
    colorName = DEFAULT_COLOR
  }
  localStorage.setItem(`${element}Color`, colorName)
  document.documentElement.style.setProperty(
    `--${element}-color`,
    colors[colorName][500],
  )
  document.querySelectorAll(`.${element}`).forEach(el => {
    el.style.setProperty('color', colors[colorName][500], 'important')
  })
  console.log(`Applied ${colorName} to ${element}`)
}

// Fonctions pour définir les couleurs spécifiques
const setGreetingColor = colorName => {
  selectedGreetingColor.value = colorName
  applyColor('greeting', colorName)
}

const setNameColor = colorName => {
  selectedNameColor.value = colorName
  applyColor('name', colorName)
}

const setTitleColor = colorName => {
  selectedTitleColor.value = colorName
  applyColor('title', colorName)
}

const setSubtitleColor = colorName => {
  selectedSubtitleColor.value = colorName
  applyColor('subtitle', colorName)
}

// Fonction pour obtenir la classe de bouton en fonction de la couleur sélectionnée
const getButtonClass = (color, selectedColor) => ({
  'ring-2 ring-offset-2 ring-white dark:ring-gray-900': color === selectedColor,
})

// Fonction pour afficher le nom de la couleur avec la première lettre en majuscule
const displayColor = color => {
  return color.charAt(0).toUpperCase() + color.slice(1)
}

// Fonction pour obtenir une couleur aléatoire
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * validColors.length)
  return validColors[randomIndex]
}

// Fonction pour appliquer une couleur aléatoire à un élément
const applyRandomColor = element => {
  const randomColor = getRandomColor()
  switch (element) {
    case 'greeting':
      setGreetingColor(randomColor)
      break
    case 'name':
      setNameColor(randomColor)
      break
    case 'title':
      setTitleColor(randomColor)
      break
    case 'subtitle':
      setSubtitleColor(randomColor)
      break
    case 'button':
      setButtonColor(randomColor)
      break
    default:
      console.warn(`Element inconnu : ${element}`)
  }
}
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Sélecteur de couleur pour greeting -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Greeting Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedGreetingColor) }}
          </span>
        </span>
        <button
          @click="applyRandomColor('greeting')"
          class="text-xs text-blue-500"
        >
          Random
        </button>
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

    <!-- Sélecteur couleur nom -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Name Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedNameColor) }}
          </span>
        </span>
        <button @click="applyRandomColor('name')" class="text-xs text-blue-500">
          Random
        </button>
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

    <!-- Sélecteur couleur pour le titre -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Title Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedTitleColor) }}
          </span>
        </span>
        <button
          @click="applyRandomColor('title')"
          class="text-xs text-blue-500"
        >
          Random
        </button>
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

    <!-- Sélecteur de couleur pour le sous-titre -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Subtitle Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedSubtitleColor) }}
          </span>
        </span>
        <button
          @click="applyRandomColor('subtitle')"
          class="text-xs text-blue-500"
        >
          Random
        </button>
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

    <!-- Sélecteur de couleur pour le bouton -->
    <div class="w-full space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Button Color:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedButtonColor) }}
          </span>
        </span>
        <button
          @click="applyRandomColor('button')"
          class="text-xs text-blue-500"
        >
          Random
        </button>
      </div>
      <div class="grid grid-cols-8 gap-2">
        <button
          v-for="color in validColors"
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
