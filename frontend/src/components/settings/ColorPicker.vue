<script setup>
import { CheckIcon } from 'lucide-vue-next'
import colors from 'tailwindcss/colors'
import { ref } from 'vue'
import { validColors } from '../../utils/ColorManager.js'

// Définition de la couleur par défaut
const DEFAULT_COLOR = 'white'

// État réactif pour les couleurs sélectionnées
const selectedColors = ref({
  greeting: localStorage.getItem('greetingColor') || DEFAULT_COLOR,
  name: localStorage.getItem('nameColor') || DEFAULT_COLOR,
  title: localStorage.getItem('titleColor') || DEFAULT_COLOR,
  subtitle: localStorage.getItem('subtitleColor') || DEFAULT_COLOR,
})

// État réactif pour l'élément actuellement sélectionné
const selectedElement = ref('greeting')

// Fonction pour appliquer une couleur à un élément
const applyColor = (element, colorName) => {
  if (!validColors.includes(colorName)) {
    console.warn(
      `Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`,
    )
    colorName = DEFAULT_COLOR
  }
  selectedColors.value[element] = colorName
  localStorage.setItem(`${element}Color`, colorName)
  document.documentElement.style.setProperty(
    `--${element}-color`,
    colors[colorName][500],
  )
  document.querySelectorAll(`.${element}`).forEach(el => {
    el.style.setProperty('color', colors[colorName][500], 'important')
  })
}

// Fonction pour appliquer des couleurs aléatoires à tous les éléments
const applyRandomColorsToAll = () => {
  Object.keys(selectedColors.value).forEach(element => {
    const randomIndex = Math.floor(Math.random() * validColors.length)
    const randomColor = validColors[randomIndex]
    applyColor(element, randomColor)
  })
}

// Fonction pour changer la couleur des boutons
const changeButtonColors = () => {
  const randomIndex = Math.floor(Math.random() * validColors.length)
  const randomColor = validColors[randomIndex]
  document.querySelectorAll('button').forEach(button => {
    if (button.id !== 'ignore-button') {
      // vérifie si le bouton n'a pas un ID spécifique 'ignore-button'}
      button.style.backgroundColor = colors[randomColor][500]
    }
  })
}

// Fonction pour obtenir la classe d'un bouton selon sa sélection
const getButtonClass = (color, selectedColor) => ({
  'ring-2 ring-offset-2 ring-white dark:ring-gray-900': color === selectedColor,
})

// Fonction pour afficher le nom de la couleur avec une majuscule initiale
const displayColor = color => color.charAt(0).toUpperCase() + color.slice(1)
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Sélection de l'élément à modifier -->
    <div class="w-full flex flex-col space-y-3">
      <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
        Elément sélectionner:
        <span class="font-semibold text-primary capitalize">{{
          selectedElement
        }}</span>
      </span>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(color, element) in selectedColors"
          :key="element"
          @click="selectedElement = element"
          class="flex-1 px-4 py-2 text-xs rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          :class="{
            'bg-blue-500 text-white': selectedElement === element,
            'bg-gray-200 text-gray-700': selectedElement !== element,
          }"
        >
          {{ element }}
        </button>
      </div>
    </div>

    <!-- Panneau de sélection des couleurs -->
    <div class="w-full space-y-3">
      <div class="flex items-center">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
          Current Color for {{ selectedElement }}:
          <span class="font-semibold text-primary capitalize">
            {{ displayColor(selectedColors[selectedElement]) }}
          </span>
        </span>
      </div>
      <div class="grid grid-cols-8 gap-2">
        <button
          id="ignore-button"
          v-for="color in validColors"
          :key="color"
          class="w-6 h-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          :class="getButtonClass(color, selectedColors[selectedElement])"
          :style="{ backgroundColor: colors[color][500] }"
          @click="applyColor(selectedElement, color)"
        >
          <CheckIcon
            v-if="color === selectedColors[selectedElement]"
            class="w-3 h-3 text-white mx-auto"
          />
        </button>
      </div>
    </div>

    <!-- Bouton pour changer la couleur des boutons -->
    <div class="w-full flex justify-end">
      <button
        @click="changeButtonColors"
        class="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
      >
        Change Button Colors
      </button>
    </div>

    <!-- Bouton pour appliquer des couleurs aléatoires à tous les éléments -->
    <div>
      <button
        @click="applyRandomColorsToAll"
        class="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
      >
        Apply Random Colors to All
      </button>
    </div>
  </div>
</template>
