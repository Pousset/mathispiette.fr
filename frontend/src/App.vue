<script setup>
import { onMounted } from 'vue'
import { loadSavedColor } from './utils/ButtonColorManager'
import { initializeTheme } from './utils/themeManager'
import { loadSavedDevWebColor } from './utils/DevWebColorManager'
import ThemeCustomizer from './components/ui/ThemeCustomizer.vue'

onMounted(() => {
  loadSavedColor()
  initializeTheme()
  loadSavedDevWebColor()
})
</script>
<template>
  <router-view />
  <ThemeCustomizer />
</template>
