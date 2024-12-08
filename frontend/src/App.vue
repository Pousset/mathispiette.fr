<script setup>
import { onMounted } from 'vue'
import { loadSavedColor } from './utils/ColorManager'
import { initializeTheme } from './utils/themeManager'
import ThemeCustomizer from './components/ui/ThemeCustomizer.vue'

onMounted(() => {
  loadSavedColor()
  initializeTheme()
})
</script>
<template>
  <router-view />
  <ThemeCustomizer />
</template>
