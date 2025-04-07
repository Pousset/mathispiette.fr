<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Importez les images
import barImage from '@/assets/bar.jpg'
import comptoirImage from '@/assets/comptoir.jpg'

const router = useRouter()
const imageSrc = ref(barImage) // Image initiale

const logout = () => {
  sessionStorage.removeItem('user') // Supprime l'état de connexion
  router.push('/') // Redirige vers la page d'accueil
}

const enterBar = () => {
  if (imageSrc.value === barImage) {
    imageSrc.value = comptoirImage // Change l'image au clic
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
          alt="Bar"
          class="w-64 h-auto rounded shadow-lg cursor-pointer"
          @click="enterBar"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600;
}
</style>
