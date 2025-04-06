import { createRouter, createWebHistory } from 'vue-router'
import PortfolioView from '@/views/PortfolioView.vue'
import RegisterView from '@/views/RegisterView.vue' // ← Assure-toi que cette importation est correcte

const routes = [
  {
    path: '/register', // ← La route pour le formulaire d'inscription
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/:section?', // ← Ta route dynamique pour Portfolio
    component: PortfolioView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
