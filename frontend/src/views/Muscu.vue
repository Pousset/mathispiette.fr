<script setup>
import Navbar from '@/components/ui/Navbar.vue'
import { ref } from 'vue'

const program = ref([
  {
    semaine: 1,
    jours: [
      {
        jour: 1,
        exercices: ['5', '4', '3', '2', '1 (30s à 1min de repos)'],
        open: false,
        valide: false,
      },
      {
        jour: 2,
        exercices: ['6', '5', '4', '3', '2'],
        open: false,
        valide: false,
      },
      {
        jour: 3,
        exercices: ['7', '6', '5', '4', '3'],
        open: false,
        valide: false,
      },
    ],
  },
  {
    semaine: 2,
    jours: [
      {
        jour: 1,
        exercices: ['8', '6', '4', '4', '2'],
        open: false,
        valide: false,
      },
      {
        jour: 2,
        exercices: ['10', '8', '6', '4', '2'],
        open: false,
        valide: false,
      },
      {
        jour: 3,
        exercices: ['12', '10', '8', '6', '4'],
        open: false,
        valide: false,
      },
    ],
  },
  {
    semaine: 3,
    jours: [
      {
        jour: 1,
        exercices: ['15', '10', '8', '5', '5'],
        open: false,
        valide: false,
      },
      {
        jour: 2,
        exercices: ['17', '12', '10', '6', '6'],
        open: false,
        valide: false,
      },
      {
        jour: 3,
        exercices: ['20', '15', '10', '10', '5'],
        open: false,
        valide: false,
      },
    ],
  },
  {
    semaine: 4,
    jours: [
      {
        jour: 1,
        exercices: ['max', '15', '10', '10', '5'],
        open: false,
        valide: false,
      },
      {
        jour: 2,
        exercices: ['max', '15', '12', '10', '8'],
        open: false,
        valide: false,
      },
      {
        jour: 3,
        exercices: ['Test : max pompes d’affilée'],
        open: false,
        valide: false,
      },
    ],
  },
])

const activeDay = ref(null) // Variable pour suivre le jour actif
const currentExerciseIndex = ref(null) // Index de l'exercice en cours
const timer = ref(null) // Timer pour l'exercice
const timerRunning = ref(false) // Indique si le timer est en cours
let interval = null // Stocke le timer pour éviter les fuites mémoire

const toggleDay = jour => {
  jour.open = !jour.open
}

const startProgram = jour => {
  activeDay.value = {
    jour: jour.jour,
    exercices: jour.exercices,
  } // Définit le jour actif avec ses exercices
  currentExerciseIndex.value = null // Réinitialise l'index de l'exercice
}

const stopProgram = () => {
  activeDay.value = null // Réinitialise le jour actif
  currentExerciseIndex.value = null // Réinitialise l'index de l'exercice
  timer.value = null // Réinitialise le timer
  timerRunning.value = false // Arrête le timer
  if (interval) clearInterval(interval) // Annule le timer en cours
}

const startTraining = () => {
  currentExerciseIndex.value = 0 // Commence par le premier exercice
}

const validateExercise = () => {
  if (
    currentExerciseIndex.value !== null &&
    currentExerciseIndex.value < activeDay.value.exercices.length
  ) {
    timerRunning.value = true
    timer.value = 90 // 1 minute 30 secondes

    if (interval) clearInterval(interval) // Annule tout timer précédent

    interval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--
      } else {
        clearInterval(interval)
        timerRunning.value = false
        currentExerciseIndex.value++ // Passe à l'exercice suivant
        if (currentExerciseIndex.value >= activeDay.value.exercices.length) {
          stopProgram() // Termine le programme si tous les exercices sont terminés
        }
      }
    }, 1000)
  }
}

const validerJour = jour => {
  jour.valide = true // Marque le jour comme validé
}
</script>

<template>
  <div class="h-screen flex flex-col overflow-auto">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenu principal -->
    <div class="flex-grow p-4">
      <h1 class="text-3xl font-bold mb-6">Programme de Musculation</h1>
      <div v-if="activeDay" class="mb-6">
        <h2 class="text-2xl font-semibold mb-4">
          Programme du Jour {{ activeDay.jour }}
        </h2>
        <div v-if="currentExerciseIndex === null">
          <button
            @click="startTraining"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Démarrer l'entraînement
          </button>
        </div>
        <div v-else>
          <h3 class="text-xl font-semibold mb-4">
            Exercice : {{ activeDay.exercices[currentExerciseIndex] }}
          </h3>
          <div class="text-sm text-gray-500 mt-2">
            {{ currentExerciseIndex + 1 }}/{{ activeDay.exercices.length }}
            exercices
          </div>
          <div v-if="timerRunning" class="text-lg font-bold text-red-500">
            Temps restant : {{ Math.floor(timer / 60) }}m {{ timer % 60 }}s
          </div>
          <button
            v-if="!timerRunning"
            @click="validateExercise"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Valider
          </button>
        </div>
        <button
          @click="stopProgram"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Arrêter le programme
        </button>
      </div>
      <div v-else>
        <div v-for="semaine in program" :key="semaine.semaine" class="mb-6">
          <h2 class="text-2xl font-semibold mb-4">
            Semaine {{ semaine.semaine }}
          </h2>
          <ul class="space-y-2">
            <li
              v-for="jour in semaine.jours"
              :key="jour.jour"
              class="p-4 bg-gray-100 rounded shadow cursor-pointer"
              @click="toggleDay(jour)"
            >
              <div class="flex justify-between items-center">
                <strong>Jour {{ jour.jour }}</strong>
                <span>{{ jour.open ? '▲' : '▼' }}</span>
              </div>
              <div v-if="jour.open" class="mt-2 text-gray-700">
                <ul class="list-disc pl-6">
                  <li v-for="exercice in jour.exercices" :key="exercice">
                    {{ exercice }}
                  </li>
                </ul>
                <div class="flex gap-2 mt-4">
                  <button
                    @click.stop="startProgram(jour)"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Lancer le programme
                  </button>
                  <button
                    @click.stop="validerJour(jour)"
                    :disabled="jour.valide"
                    class="px-4 py-2 rounded text-white"
                    :class="
                      jour.valide
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600'
                    "
                  >
                    {{ jour.valide ? 'Jour validé ✅' : 'Valider le jour' }}
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #4a5568; /* Couleur personnalisée */
}
li {
  transition: background-color 0.3s;
}
li:hover {
  background-color: #edf2f7; /* Couleur au survol */
}
button {
  transition: background-color 0.3s;
}
button:hover {
  background-color: #4299e1; /* Couleur au survol */
}
</style>
