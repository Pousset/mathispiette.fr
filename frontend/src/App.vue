<script setup>
import { onMounted } from 'vue'
import { loadSavedColor } from '@/utils/ButtonColorManager'
import { initializeTheme } from '@/utils/themeManager'

onMounted(() => {
  loadSavedColor()
  initializeTheme()
})
</script>

<template>
  <router-view />
</template>
