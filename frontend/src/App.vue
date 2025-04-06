<script setup>
import { onMounted } from 'vue'
import { loadSavedColor } from './utils/ColorManager'
import { initializeTheme } from './utils/themeManager'
import ThemeCustomizer from './components/ui/ThemeCustomizer.vue'
import RegisterButton from '@/components/auth/RegisterButton.vue'
import SettingsMenu from '@/components/base/SettingsMenu.vue'

onMounted(() => {
  loadSavedColor()
  initializeTheme()
})
</script>
<template>
  <div>
    <RegisterButton />
    <router-view />
    <ThemeCustomizer />
    <SettingsMenu />
  </div>
</template>
