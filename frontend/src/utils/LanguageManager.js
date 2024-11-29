import { ref } from 'vue'

const LANGUAGES = {
  EN: 'English',
  FR: 'Français',
}

const DEFAULT_LANGUAGE = LANGUAGES.FR

export function useLanguage() {
  const currentLanguage = ref(localStorage.getItem('language') || DEFAULT_LANGUAGE)

  function switchLanguage() {
    currentLanguage.value =
      currentLanguage.value === LANGUAGES.FR ? LANGUAGES.EN : LANGUAGES.FR
    localStorage.setItem('language', currentLanguage.value)
  }

  return {
    currentLanguage,
    switchLanguage,
  }
}