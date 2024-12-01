<script setup>
import { onMounted } from 'vue'
import { loadSavedColor } from '@/utils/ButtonColorManager'
import { initializeTheme } from '@/utils/themeManager'
import { loadSavedDevWebColor } from '@/utils/DevWebColorManager'
import TopRightButton from '@/components/TopRightButton.vue'

onMounted(() => {
  loadSavedColor()
  initializeTheme()
  loadSavedDevWebColor()
})
</script>
<template>
  <router-view />
  <TopRightButton />
</template>
