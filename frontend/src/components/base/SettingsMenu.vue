<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Palette } from 'lucide-vue-next'
import ThemeSwitcher from '../settings/ThemeSwitcher.vue'
import ButtonColorPicker from '../settings/ColorPicker.vue'
import ScrollBarToggle from '../settings/ScrollBarToggle.vue'
import { isOpen, toggle } from '../../utils/toggle.js'
import { useTheme } from '@/utils/themeManager.js'

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
  console.log('Nouveau Bouton cliqué')
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
  window.location.reload()
}

// Utilisation du thème
const { effectiveTheme } = useTheme()

// Ajout des écouteurs d'événements au montage du composant
onMounted(() => {
  document.addEventListener('click', closePopover)
  const popover = document.querySelector('.theme-customizer-popover')
  if (popover) {
    popover.style.transition = 'background-color 0.5s ease'
    popover.style.backgroundColor = savedColor.value
  }
})

// Suppression des écouteurs d'événements au démontage du composant
onUnmounted(() => {
  document.removeEventListener('click', closePopover)
})
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
      class="theme-customizer-popover fixed bottom-20 right-4 w-72 md:w-96 rounded-2xl shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
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
          <button
            :class="`${buttonColor.value} w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300`"
            @click="handleButtonClick"
          >
            <span
              :class="effectiveTheme === 'dark' ? 'text-white' : 'text-black'"
              >Change BG</span
            >
          </button>
        </div>
        <div>
          <button
            class="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
            @click="reloadPage"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
