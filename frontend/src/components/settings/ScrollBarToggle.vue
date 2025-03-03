<script setup>
import { inject } from 'vue'

// Injection de la propriété réactive 'showScrollbar' depuis le parent
const showScrollbar = inject('showScrollbar')

// Fonction pour basculer l'état de la barre de défilement
const toggleScrollbar = () => {
  showScrollbar.value = !showScrollbar.value
}
</script>

<template>
  <div class="flex items-center justify-between">
    <!-- Libellé pour l'option de la barre de défilement -->
    <span class="text-sm font-medium text-gray-900 dark:text-gray-100"
      >Show Scrollbar</span
    >
    <!-- Bouton pour activer/désactiver la barre de défilement -->
    <button
      @click="toggleScrollbar"
      class="relative inline-flex h-6 w-11 items-center rounded-full"
      :class="
        showScrollbar
          ? 'bg-primary-500 dark:bg-primary-600'
          : 'bg-gray-200 dark:bg-gray-700'
      "
    >
      <!-- Indicateur de l'état de la barre de défilement -->

      class="inline-block h-4 w-4 transform rounded-full bg-white transition"
      :class="showScrollbar ? 'translate-x-6' : 'translate-x-1'" >
    </button>
  </div>
</template>

<style>
/* Styles pour masquer la barre de défilement */
.scrollbar-hidden {
  /* Firefox */
  scrollbar-width: none;
  /* IE et Edge */
  -ms-overflow-style: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  /* Chrome, Safari, Opera */
  display: none;
}

/* Styles pour afficher une barre de défilement fine */
.scrollbar-visible {
  /* Firefox */
  scrollbar-width: thin;
  /* IE et Edge */
  -ms-overflow-style: auto;
}

.scrollbar-visible::-webkit-scrollbar {
  /* Largeur de la barre de défilement */
  width: 8px;
}

.scrollbar-visible::-webkit-scrollbar-track {
  /* Couleur de la piste */
  background: rgba(0, 0, 0, 0.1);
}

.scrollbar-visible::-webkit-scrollbar-thumb {
  /* Couleur du pouce */
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.dark .scrollbar-visible::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.dark .scrollbar-visible::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
}
</style>
