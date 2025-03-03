<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toggle } from '@/utils/toggle.js'

// Définition des données utilisées dans le composant
const data = {
  greeting: 'Hey there!',
  name: 'Mathis PIETTE',
  secondaryName: 'And YOU ?',
  title: 'Web Developer Frontend & Backend',
  subtitle: "Curieux & Passionés d'IT",
}

// Références pour manipuler les éléments du DOM
const greetingRef = ref(null)
const alternatingTextRef = ref(null)
const contentRef = ref(null)
const showCursor = ref(true)
const showContent = ref(false)

let cursorInterval = null

// Fonction pour simuler l'effet d'écriture
const typeWriter = (element, text, speed = 100) => {
  let i = 0
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
      } else {
        clearInterval(timer)
        resolve()
      }
    }, speed)
  })
}

// Fonction pour effacer le texte
const eraseText = (element, speed = 50) => {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (element.textContent.length > 0) {
        element.textContent = element.textContent.slice(0, -1)
      } else {
        clearInterval(timer)
        resolve()
      }
    }, speed)
  })
}

// Fonction pour faire clignoter le curseur
const blinkCursor = () => {
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
}

// Fonction pour alterner le texte affiché
const alternateText = async () => {
  if (data.secondaryName) {
    while (true) {
      await typeWriter(alternatingTextRef.value, data.name, 100)
      await new Promise(resolve => setTimeout(resolve, 2000))
      await eraseText(alternatingTextRef.value)
      await typeWriter(alternatingTextRef.value, data.secondaryName, 100)
      await new Promise(resolve => setTimeout(resolve, 3000))
      await eraseText(alternatingTextRef.value)
    }
  } else {
    await typeWriter(alternatingTextRef.value, data.name, 100)
  }
}

// Actions à effectuer lors du montage du composant
onMounted(async () => {
  blinkCursor()
  await typeWriter(greetingRef.value, data.greeting)
  showContent.value = true
  await new Promise(resolve => setTimeout(resolve, 1000)) // Attendre que le contenu apparaisse
  alternateText()
})

// Actions à effectuer lors du démontage du composant
onUnmounted(() => {
  if (cursorInterval) clearInterval(cursorInterval)
})

// Gestionnaire pour le clic sur le bouton du bas
const handleBottomButtonClick = () => {
  console.log('Bottom Button Clicked!')
}

// Gestionnaire pour le clic sur le bouton de gauche
const handleLeftButtonClick = () => {
  console.log('Left Button Clicked!')
}

// Gestionnaire pour le clic sur le bouton "Customize your experience"
const handleCustomizeClick = () => {
  console.log('Customize your experience Button Clicked!')
  toggle()
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen text-gray-800 dark:text-white p-4 relative overflow-hidden"
  >
    <div class="text-center z-10 space-y-6">
      <h1 class="text-4xl md:text-5xl font-bold relative">
        <span ref="greetingRef" class="inline-block greeting"></span>
        <span
          class="inline-block w-0.5 h-8 bg-gray-800 dark:bg-white animate-blink ml-1"
          :class="{ 'opacity-0': !showCursor }"
        ></span>
      </h1>
      <div
        ref="contentRef"
        class="space-y-6 transition-opacity duration-1000"
        :class="{ 'opacity-0': !showContent, 'opacity-100': showContent }"
      >
        <h2 class="text-3xl md:text-4xl font-bold">
          <span class="text-teal-500 dark:text-teal-400">It's me </span>
          <span
            ref="alternatingTextRef"
            class="text-yellow-500 dark:text-yellow-400 name"
          ></span>
        </h2>
        <p class="text-xl md:text-2xl title">
          {{ data.title }}
        </p>
        <p class="text-lg text-gray-600 dark:text-gray-400 subtitle">
          {{ data.subtitle }}
        </p>
        <button
          @click.stop="handleCustomizeClick"
          class="inline-block px-8 py-3 font-bold text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
        >
          Customize your experience
        </button>
      </div>
    </div>
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <!-- <button
        @click="handleLeftButtonClick"
        class="inline-block px-8 py-3 font-bold text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 hover:from-green-500 hover:via-blue-600 hover:to-indigo-600"
      >
        Left Button
      </button> -->
      <button
        @click="handleBottomButtonClick"
        class="inline-block px-8 py-3 font-bold text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 hover:from-green-500 hover:via-blue-600 hover:to-indigo-600"
      >
        Bottom Button
      </button>
    </div>
  </div>
</template>
