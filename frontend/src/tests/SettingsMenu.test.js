import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SettingsMenu from '@/components/settings/SettingsMenu.vue'
import { isOpen } from '@/utils/toggle.js'

describe('SettingsMenu.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = mount(SettingsMenu, {
      global: {
        stubs: [
          'ThemeSwitcher',
          'ScrollBarToggle',
          'ButtonColorPicker',
          'LanguageSwitcher',
          'ResetTextColorButton',
        ],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('opens and closes the settings menu when the button is clicked', async () => {
    const wrapper = mount(SettingsMenu, {
      global: {
        stubs: [
          'ThemeSwitcher',
          'ScrollBarToggle',
          'ButtonColorPicker',
          'LanguageSwitcher',
          'ResetTextColorButton',
        ],
      },
    })

    const button = wrapper.find('button.theme-customizer-button')

    // Vérifie que le menu est fermé au départ
    expect(isOpen.value).toBe(false)

    // Clique sur le bouton pour ouvrir le menu
    await button.trigger('click')
    expect(isOpen.value).toBe(true)

    // Clique à nouveau sur le bouton pour fermer le menu
    await button.trigger('click')
    expect(isOpen.value).toBe(false)
  })
})
