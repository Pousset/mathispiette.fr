<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Importez les images
import melinCards from '@/assets/melin_cards.jpg'
import melinCards2 from '@/assets/melin_cards2.jpg'

const router = useRouter()
const clickCount = ref(0) // Compteur de clics
const imageSrc = ref(melinCards) // Source de l'image

const logout = () => {
  sessionStorage.removeItem('user') // Supprime l'état de connexion
  router.push('/') // Redirige vers la page d'accueil
}

const incrementClickCount = () => {
  clickCount.value++ // Incrémente le compteur
  if (clickCount.value >= 10) {
    imageSrc.value = melinCards2 // Change l'image après 10 clics
  }
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Navbar -->
    <nav
      class="bg-gray-800 text-white px-4 py-2 flex justify-center items-center"
    >
      <button @click="logout" class="btn">Se déconnecter</button>
    </nav>

    <!-- Contenu principal -->
    <div class="flex-grow flex items-center justify-center">
      <div class="text-center">
        <img
          :src="imageSrc"
          alt="Melin Cards"
          class="w-64 h-auto rounded shadow-lg cursor-pointer"
          @click="incrementClickCount"
        />
        <p class="mt-4 text-lg font-medium text-gray-700">
          Nombre de clics : {{ clickCount }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600;
}
</style>
