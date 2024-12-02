<script setup>
const scrollToNextSection = () => {
  const windowHeight = window.innerHeight
  const currentScroll = window.scrollY
  window.scrollTo(0, currentScroll + windowHeight)
}
</script>

<template>
  <button
    @click="scrollToNextSection"
    class="fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg bg-primary-500 text-white hover:bg-primary-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    aria-label="Scroll to next section"
  >
    <slot>Next</slot>
  </button>
</template>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
