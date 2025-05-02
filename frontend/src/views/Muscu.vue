<script setup>
import Navbar from '@/components/ui/Navbar.vue'
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenu principal -->
    <div class="flex-grow flex items-center justify-center">
      <h1 class="text-3xl font-bold">Bienvenue à la page Muscu !</h1>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #4a5568; /* Couleur personnalisée */
}
</style>
