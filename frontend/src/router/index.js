import { createRouter, createWebHistory } from 'vue-router'
import PortfolioView from '@/views/PortfolioView.vue'

// Vérifie si l'utilisateur est connecté
const isAuthenticated = () => {
  return !!sessionStorage.getItem('user') // Retourne true si l'utilisateur est connecté
}

const routes = [
  {
    path: '/:section?',
    component: PortfolioView,
  },
  {
    path: '/succesLogin',
    name: 'SuccesLogin',
    component: () => import('@/views/SuccesLogin.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next() // Autorise l'accès si l'utilisateur est connecté
      } else {
        next('/') // Redirige vers la page d'accueil si non connecté
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
