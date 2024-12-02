import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ContactSection from '../components/sections/ContactSection.vue'

describe('ContactSection.vue', () => {
    it('renders contact section correctly', () => {
        const wrapper = mount(ContactSection)
        expect(wrapper.find('h2').text()).toBe('Contact Me')
        expect(wrapper.find('p').text()).toBe("N'hésitez pas à me contacter par courriel ou sur les réseaux sociaux.")
    })

    it('renders email button correctly', () => {
        const wrapper = mount(ContactSection)
        const button = wrapper.find('button')
        expect(button.exists()).toBe(true)
        expect(button.text()).toContain('Send me an email')
    })

    it('opens email client on button click', async () => {
        const wrapper = mount(ContactSection)
        window.location = { href: '' }
        await wrapper.find('button').trigger('click')
        expect(window.location.href).toBe('mailto:mathispiette@gmail.com')
    })

    it('renders social links correctly', () => {
        const wrapper = mount(ContactSection)
        const links = wrapper.findAll('a')
        expect(links.length).toBe(3)
        expect(links[0].attributes('href')).toBe('https://www.linkedin.com/in/mathis-piette-448752153')
        expect(links[1].attributes('href')).toBe('https://github.com/Pousset')
        expect(links[2].attributes('href')).toBe('https://www.instagram.com/mathispiette/')
    })
})