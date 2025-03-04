<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Palette,
  RefreshCw,
  Lock,
  Unlock,
  Shuffle,
  CheckIcon,
} from 'lucide-vue-next'
import ThemeSwitcher from '../settings/ThemeSwitcher.vue'
import ButtonColorPicker from '../settings/ColorPicker.vue'
import ScrollBarToggle from '../settings/ScrollBarToggle.vue'
import { isOpen, toggle } from '../../utils/toggle.js'
import { useTheme } from '@/utils/themeManager.js'
import colors from 'tailwindcss/colors'
import { validColors } from '../../utils/ColorManager.js'

// Références pour les couleurs sauvegardées
const savedColor = ref(localStorage.getItem('popoverBgColor') || 'bg-white')
const buttonColor = ref('bg-blue-500')

// Fonction pour générer une couleur aléatoire
const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// Fonction pour gérer le clic sur le bouton et changer la couleur de fond
const handleButtonClick = () => {
  console.log('Change BG Button Clicked')
  const randomColor = getRandomColor()
  const popover = document.querySelector('.theme-customizer-popover')
  popover.style.transition = 'background-color 0.5s ease'
  popover.style.backgroundColor = randomColor
  localStorage.setItem('popoverBgColor', randomColor)
  savedColor.value = randomColor
  buttonColor.value = randomColor
  console.log(`Couleur de fond actuelle: ${randomColor}`)
}

// Fonction pour recharger la page
const reloadPage = () => {
  console.log('Reload Page Button Clicked')
  window.location.reload()
}

// Fonction pour gérer le clic sur le bouton ScrollBarToggle
const handleScrollBarToggleClick = () => {
  console.log('ScrollBarToggle Button Clicked')
}

// Fonction pour gérer le clic sur le bouton ThemeSwitcher
const handleThemeSwitcherClick = () => {
  console.log('ThemeSwitcher Button Clicked')
}

// Fonction pour gérer le clic sur le bouton ButtonColorPicker
const handleButtonColorPickerClick = () => {
  console.log('ButtonColorPicker Button Clicked')
}

// Utilisation du thème
const { effectiveTheme } = useTheme()

// Variables pour le drag and drop
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)
const popoverX = ref(0)
const popoverY = ref(0)
const isLocked = ref(false) // Variable pour suivre l'état de verrouillage

// Fonction pour fermer le popover si on clique en dehors
const closePopover = event => {
  if (
    isOpen.value &&
    !event.target.closest('.theme-customizer-button') &&
    !event.target.closest('.theme-customizer-popover')
  ) {
    isOpen.value = false
  }
}

// Fonction pour démarrer le drag
const startDrag = event => {
  isDragging.value = true
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY
  const popover = document.querySelector('.theme-customizer-popover')
  popoverX.value = popover.offsetLeft
  popoverY.value = popover.offsetTop
}

// Fonction pour arrêter le drag
const stopDrag = () => {
  isDragging.value = false
}

// Fonction pour déplacer le popover
const dragPopover = event => {
  if (isDragging.value) {
    const popover = document.querySelector('.theme-customizer-popover')
    const deltaX = event.clientX - dragStartX.value
    const deltaY = event.clientY - dragStartY.value
    popover.style.left = `${popoverX.value + deltaX}px`
    popover.style.top = `${popoverY.value + deltaY}px`
  }
}

// Fonction pour verrouiller/déverrouiller le menu
const toggleLock = () => {
  isLocked.value = !isLocked.value
  console.log(`isLocked: ${isLocked.value}`)
  if (isLocked.value) {
    document.removeEventListener('click', closePopover)
  } else {
    document.addEventListener('click', closePopover)
  }
}

// Ajout des écouteurs d'événements au montage du composant
onMounted(() => {
  document.addEventListener('click', closePopover)
  document.addEventListener('mousemove', dragPopover)
  document.addEventListener('mouseup', stopDrag)
  const popover = document.querySelector('.theme-customizer-popover')
  if (popover) {
    popover.style.transition = 'background-color 0.5s ease'
    popover.style.backgroundColor = savedColor.value
  }
})

// Suppression des écouteurs d'événements au démontage du composant
onUnmounted(() => {
  document.removeEventListener('click', closePopover)
  document.removeEventListener('mousemove', dragPopover)
  document.removeEventListener('mouseup', stopDrag)
})

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
    if (!button.closest('.color-picker-panel')) {
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
  <div class="relative">
    <!-- Bouton pour ouvrir le menu de personnalisation -->
    <button
      class="theme-customizer-button fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      @click.stop="toggle"
      aria-haspopup="true"
      :aria-expanded="isOpen"
    >
      <Palette class="w-9 h-9" />
    </button>

    <!-- Popover de personnalisation -->
    <div
      v-if="isOpen"
      class="theme-customizer-popover fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-72 md:w-96 rounded-2xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="theme-menu"
      @mousedown="startDrag"
    >
      <div class="p-4 space-y-6" role="none">
        <!-- Bouton pour fermer le menu -->
        <button
          class="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300"
          @click="toggle"
        >
          <span class="sr-only">Fermer</span>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div
          @click="handleScrollBarToggleClick"
          class="flex items-center space-x-2"
        >
          <ScrollBarToggle />
        </div>
        <div
          @click="handleThemeSwitcherClick"
          class="flex items-center space-x-2"
        >
          <ThemeSwitcher />
          <span class="text-gray-700 dark:text-gray-300">Switch Theme</span>
        </div>
        <div
          @click="handleButtonColorPickerClick"
          class="flex items-center space-x-2"
        >
          <ButtonColorPicker />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            class="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
            @click="handleButtonClick"
          >
            <Shuffle class="w-6 h-6" />
            <span>Shuffle Colors</span>
          </button>
          <button
            class="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
            @click="reloadPage"
          >
            <RefreshCw class="w-6 h-6" />
            <span>Reload Page</span>
          </button>
          <button
            class="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
            @click="changeButtonColors"
          >
            <span>Change Button Colors</span>
          </button>
          <button
            class="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
            @click="applyRandomColorsToAll"
          >
            <span>Apply Random Colors to All</span>
          </button>
        </div>
        <div>
          <button
            :class="[
              'w-full py-2 px-4 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2',
              isLocked.value
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600',
            ]"
            @click="toggleLock"
          >
            <component :is="isLocked.value ? Unlock : Lock" class="w-6 h-6" />
            <span>{{ isLocked.value ? 'Menu Unlock' : 'Menu Lock' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
