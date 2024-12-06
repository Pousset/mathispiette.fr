import { ref, computed } from 'vue'
import colors from 'tailwindcss/colors'

// Configuration des couleurs pour les boutons et le texte
const COLOR_CONFIG = {
  button: { default: 'yellow', shade: 500, storageKey: 'ButtonColor' },
  text: { default: 'white', shade: 600, storageKey: 'TextColor' },
}

// Liste des couleurs valides
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

// Vérifie si la couleur est valide
function isValidColor(color, type = 'button') {
  const { shade } = COLOR_CONFIG[type]
  return validColors.includes(color) && colors[color]?.[shade] != null
}

// Applique la couleur spécifiée
function applyColor(colorName, type = 'button') {
  const { default: defaultColor, shade } = COLOR_CONFIG[type]
  if (!isValidColor(colorName, type)) {
    console.warn(
      `Couleur invalide : ${colorName}. Utilisation de ${defaultColor} à la place`,
    )
    colorName = defaultColor
  }
  const property = type === 'text' ? '--text-color' : `--primary-${shade}`
  document.documentElement.style.setProperty(property, colors[colorName][shade])
}

// Charge la couleur sauvegardée depuis le localStorage
function loadSavedColor(type = 'button') {
  const { storageKey, default: defaultColor } = COLOR_CONFIG[type]
  const savedColor = localStorage.getItem(storageKey)
  const validatedColor = isValidColor(savedColor, type)
    ? savedColor
    : defaultColor

  if (savedColor !== validatedColor) {
    localStorage.setItem(storageKey, validatedColor)
  }

  applyColor(validatedColor, type)
  return validatedColor
}

// Sauvegarde la couleur dans le localStorage et l'applique
function saveColor(colorName, type = 'button') {
  const { storageKey, default: defaultColor } = COLOR_CONFIG[type]
  if (!isValidColor(colorName, type)) {
    console.warn(
      `Couleur invalide : ${colorName}. Utilisation de ${defaultColor} à la place`,
    )
    colorName = defaultColor
  }
  localStorage.setItem(storageKey, colorName)
  applyColor(colorName, type)
}

// Réinitialise la couleur à sa valeur par défaut
function resetColor(type = 'button') {
  const { storageKey, default: defaultColor } = COLOR_CONFIG[type]
  localStorage.removeItem(storageKey)
  applyColor(defaultColor, type)
}

// Hook pour utiliser la couleur dans un composant Vue
function useColor(type = 'button') {
  const selectedColor = ref(loadSavedColor(type))

  function setColor(colorName) {
    saveColor(colorName, type)
    selectedColor.value = colorName
  }

  const displayColor = computed(
    () =>
      selectedColor.value.charAt(0).toUpperCase() +
      selectedColor.value.slice(1),
  )

  return {
    selectedColor,
    displayColor,
    setColor,
    resetColor: () => resetColor(type),
    validColors,
  }
}

// Export des hooks pour les boutons et le texte
export const useButtonColor = () => useColor('button')
export const useTextColor = () => useColor('text')

// Export de la fonction loadSavedColor
export { loadSavedColor }
