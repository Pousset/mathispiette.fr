import { ref, computed } from 'vue'

export const Theme = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
}

Object.freeze(Theme)

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT
}

function applyTheme(theme) {
  const effectiveTheme = theme === Theme.SYSTEM ? getSystemTheme() : theme
  const isDark = effectiveTheme === Theme.DARK
  document.documentElement.classList.toggle('dark', isDark)
}

export function initializeTheme() {
  const savedTheme = localStorage.getItem('theme')
  const theme = Object.values(Theme).includes(savedTheme)
    ? savedTheme
    : Theme.DARK

  applyTheme(theme)

  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (theme === Theme.SYSTEM) {
        applyTheme(Theme.SYSTEM)
      }
    })
  }

  return theme
}

export function useTheme() {
  const savedTheme = localStorage.getItem('theme')
  const theme = ref(
    Object.values(Theme).includes(savedTheme) ? savedTheme : Theme.DARK,
  )
  const systemTheme = ref(getSystemTheme())

  const effectiveTheme = computed(() => {
    return theme.value === Theme.SYSTEM ? systemTheme.value : theme.value
  })

  const displayTheme = computed(() => {
    if (theme.value === Theme.SYSTEM) {
      return `System (${effectiveTheme.value})`
    }
    return theme.value.charAt(0).toUpperCase() + theme.value.slice(1)
  })

  function setTheme(newTheme) {
    if (!Object.values(Theme).includes(newTheme)) {
      newTheme = Theme.DARK
    }
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      systemTheme.value = getSystemTheme()
      if (theme.value === Theme.SYSTEM) {
        applyTheme(Theme.SYSTEM)
      }
    })
  }

  return {
    theme,
    effectiveTheme,
    displayTheme,
    setTheme,
  }
}
