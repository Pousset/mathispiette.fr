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

const DEFAULT_COLOR = 'white'

function isValidColor(color) {
  return validColors.includes(color) && colors[color] && colors[color][600]
}

export function applyTextColor(colorName) {
  if (!isValidColor(colorName)) {
    console.warn(
      `Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`,
    )
    colorName = DEFAULT_COLOR
  }

  const colorShades = colors[colorName]
  document.documentElement.style.setProperty('--text-color', colorShades[600])
}

export function loadSavedTextColor() {
  const savedColor = localStorage.getItem('TextColor')
  const validatedColor = isValidColor(savedColor) ? savedColor : DEFAULT_COLOR

  if (savedColor !== validatedColor) {
    localStorage.setItem('TextColor', validatedColor)
  }

  applyTextColor(validatedColor)
  return validatedColor
}

export function saveTextColor(colorName) {
  if (!isValidColor(colorName)) {
    console.warn(
      `Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`,
    )
    colorName = DEFAULT_COLOR
  }

  localStorage.setItem('TextColor', colorName)
  applyTextColor(colorName)
}

export function resetTextColor() {
  localStorage.removeItem('TextColor')
  applyTextColor(DEFAULT_COLOR)
}

export function useTextColor() {
  const selectedColor = ref(loadSavedTextColor())

  function setTextColor(colorName) {
    if (!isValidColor(colorName)) {
      console.warn(
        `Invalid color: ${colorName}. Falling back to ${DEFAULT_COLOR}`,
      )
      colorName = DEFAULT_COLOR
    }

    selectedColor.value = colorName
    saveTextColor(colorName)
  }

  const displayColor = computed(() => {
    return (
      selectedColor.value.charAt(0).toUpperCase() + selectedColor.value.slice(1)
    )
  })

  return {
    selectedColor,
    displayColor,
    setTextColor,
    resetTextColor,
    validColors,
  }
}
