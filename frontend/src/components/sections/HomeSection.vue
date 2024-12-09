<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toggle } from '@/utils/toggle.js'

// Données pour la section d'accueil
const data = {
  greeting: 'Hey there!',
  name: 'Mathis PIETTE',
  secondaryName: 'And YOU ?',
  title: 'Web Developer Frontend & Backend',
  subtitle: "Curieux & Passionés d'IT",
}

// Références pour les éléments DOM
const greetingRef = ref(null)
const alternatingTextRef = ref(null)
const contentRef = ref(null)
const showCursor = ref(true)
const showContent = ref(false)

let cursorInterval = null

// Fonction afficher le texte lettre par lettre
const typeWriter = (element, text, speed = 100) => {
  let i = 0
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i) // Ajoute une lettre à la fois
        i++
      } else {
        clearInterval(timer)
        resolve()
      }
    }, speed)
  })
}
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

// Lifecycle hook pour l'initialisation
onMounted(async () => {
  blinkCursor() // Démarre le clignotement du curseur
  await typeWriter(greetingRef.value, data.greeting) // Affiche le message de salutation
  showContent.value = true // Affiche le contenu
  await new Promise(resolve => setTimeout(resolve, 1000)) // Attend que le contenu apparaisse
  alternateText() // Démarre l'alternance du texte
})

// Lifecycle hook pour la disparition

onUnmounted(() => {
  if (cursorInterval) clearInterval(cursorInterval)
})
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
          @click.stop="toggle"
          class="inline-block px-8 py-3 font-bold text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
        >
          Customize your experience
        </button>
      </div>
    </div>
  </div>
</template>
