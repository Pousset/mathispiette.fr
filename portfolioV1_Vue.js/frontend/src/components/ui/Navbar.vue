<script setup>
const logout = () => {
  sessionStorage.removeItem('user') // Supprime l'état de connexion
  window.location.href = '/' // Redirige vers la page d'accueil
}

const goToMuscu = () => {
  window.location.href = '/muscu' // Redirige vers la route /muscu
}
</script>

<template>
  <nav
    class="bg-gray-800 text-white px-4 py-2 flex justify-center items-center space-x-4"
  >
    <button @click="logout" class="btn">Se déconnecter</button>
    <button @click="goToMuscu" class="btn">Aller à Muscu</button>
  </nav>
</template>

<style scoped>
.btn {
  @apply bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600;
}
</style>
