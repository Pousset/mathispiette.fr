<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  sessionStorage.removeItem('user') // Supprime l'état de connexion
  router.push('/') // Redirige vers la page d'accueil
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Bienvenue !</h1>
    <button @click="logout" class="btn">Se déconnecter</button>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600;
}
</style>
