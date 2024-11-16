import { ref, computed } from 'vue'
import colors from 'tailwindcss/colors'

export const validColors = [
  'emerald',
  'green',
  'lime',
  'red',
  'orange',
  'amber',
  'yellow',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'white',
]

const DEFAULT_COLOR = 'white'

function isValidColor(color) {
  return validColors.includes(color) && colors[color] && colors[color][500]
}

export function applyDevWebColor(colorName) {
  if (!isValidColor(colorName)) {
    console.warn(
      `Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`,
    )
    colorName = DEFAULT_COLOR
  }

  const colorShades = colors[colorName]
  Object.entries(colorShades).forEach(([shade, value]) => {
    document.documentElement.style.setProperty(`--devweb-${shade}`, value)
  })
}

export function loadSavedDevWebColor() {
  const savedColor = localStorage.getItem('DevWebColor')
  const validatedColor = isValidColor(savedColor) ? savedColor : DEFAULT_COLOR

  if (savedColor !== validatedColor) {
    localStorage.setItem('DevWebColor', validatedColor)
  }

  applyDevWebColor(validatedColor)
  return validatedColor
}

export function saveDevWebColor(colorName) {
  if (!isValidColor(colorName)) {
    console.warn(
      `Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`,
    )
    colorName = DEFAULT_COLOR
  }

  localStorage.setItem('DevWebColor', colorName)
  applyDevWebColor(colorName)
}

export function useDevWebColor() {
  const selectedColor = ref(loadSavedDevWebColor())

  function setDevWebColor(colorName) {
    if (!isValidColor(colorName)) {
      console.warn(
        `Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`,
      )
      colorName = DEFAULT_COLOR
    }

    selectedColor.value = colorName
    saveDevWebColor(colorName)
  }

  const displayColor = computed(() => {
    return (
      selectedColor.value.charAt(0).toUpperCase() + selectedColor.value.slice(1)
    )
  })

  return {
    selectedColor,
    displayColor,
    setDevWebColor,
    validColors,
  }
}