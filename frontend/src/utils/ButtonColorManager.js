// ButtonColorManager.js
import { ref, computed } from 'vue'
import colors from 'tailwindcss/colors'

export const validColors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
]

const DEFAULT_COLOR = 'yellow'

function isValidColor(color) {
  return validColors.includes(color) && colors[color] && colors[color][500]
}

export function applyColor(colorName) {
  if (!isValidColor(colorName)) {
    console.warn(`Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`)
    colorName = DEFAULT_COLOR
  }

  const colorShades = colors[colorName]
  Object.entries(colorShades).forEach(([shade, value]) => {
    document.documentElement.style.setProperty(`--primary-${shade}`, value)
  })
}

export function loadSavedColor() {
  const savedColor = localStorage.getItem('ButtonColor')
  const validatedColor = isValidColor(savedColor) ? savedColor : DEFAULT_COLOR

  if (savedColor !== validatedColor) {
    localStorage.setItem('ButtonColor', validatedColor)
  }

  applyColor(validatedColor)
  return validatedColor
}

// Alias for loadSavedColor to maintain consistency with theme manager
export const initializeButtonColor = loadSavedColor

export function saveColor(colorName) {
  if (!isValidColor(colorName)) {
    console.warn(`Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`)
    colorName = DEFAULT_COLOR
  }

  localStorage.setItem('ButtonColor', colorName)
  applyColor(colorName)
}

export function useButtonColor() {
  const selectedColor = ref(loadSavedColor())

  function setButtonColor(colorName) {
    if (!isValidColor(colorName)) {
      console.warn(`Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`)
      colorName = DEFAULT_COLOR
    }

    selectedColor.value = colorName
    saveColor(colorName)
  }

  const displayColor = computed(() => {
    return selectedColor.value.charAt(0).toUpperCase() + selectedColor.value.slice(1)
  })

  return {
    selectedColor,
    displayColor,
    setButtonColor,
    validColors,
  }
}

// Fonctions spécifiques pour TextColor
const DEFAULT_TEXT_COLOR = 'white'

function isValidTextColor(color) {
  return validColors.includes(color) && colors[color] && colors[color][600]
}

export function applyTextColor(colorName) {
  if (!isValidTextColor(colorName)) {
    console.warn(`Invalid color: ${colorName}. Falling back to ${DEFAULT_TEXT_COLOR}`)
    colorName = DEFAULT_TEXT_COLOR
  }

  const colorShades = colors[colorName]
  document.documentElement.style.setProperty('--text-color', colorShades[600])
}

export function loadSavedTextColor() {
  const savedColor = localStorage.getItem('TextColor')
  const validatedColor = isValidTextColor(savedColor) ? savedColor : DEFAULT_TEXT_COLOR

  if (savedColor !== validatedColor) {
    localStorage.setItem('TextColor', validatedColor)
  }

  applyTextColor(validatedColor)
  return validatedColor
}

export function saveTextColor(colorName) {
  if (!isValidTextColor(colorName)) {
    console.warn(`Invalid color: ${colorName}. Falling back to ${DEFAULT_TEXT_COLOR}`)
    colorName = DEFAULT_TEXT_COLOR
  }

  localStorage.setItem('TextColor', colorName)
  applyTextColor(colorName)
}

export function resetTextColor() {
  localStorage.removeItem('TextColor')
  applyTextColor(DEFAULT_TEXT_COLOR)
}

export function useTextColor() {
  const selectedColor = ref(loadSavedTextColor())

  function setTextColor(colorName) {
    if (!isValidTextColor(colorName)) {
      console.warn(`Invalid color: ${colorName}. Falling back to ${DEFAULT_TEXT_COLOR}`)
      colorName = DEFAULT_TEXT_COLOR
    }

    selectedColor.value = colorName
    saveTextColor(colorName)
  }

  const displayColor = computed(() => {
    return selectedColor.value.charAt(0).toUpperCase() + selectedColor.value.slice(1)
  })

  return {
    selectedColor,
    displayColor,
    setTextColor,
    resetTextColor,
    validColors,
  }
}