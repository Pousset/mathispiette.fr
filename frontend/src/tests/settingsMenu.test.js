import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SettingsMenu from '@/components/base/SettingsMenu.vue'
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

    // Vérifie menu fermé au départ
    expect(isOpen.value).toBe(false)

    // Click sur le bouton pour ouvrir le menu
    await button.trigger('click')
    expect(isOpen.value).toBe(true)

    // Clicke a nouveau sur le bouton pour fermer le menu
    await button.trigger('click')
    expect(isOpen.value).toBe(false)
  })
})
