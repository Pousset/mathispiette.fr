<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User } from 'lucide-vue-next' 

const isMenuOpen = ref(false)
const username = ref('')
const password = ref('')
const message = ref('')
const errorMessage = ref('')
const router = useRouter()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  message.value = ''
  errorMessage.value = ''
}

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs.'
    return
  }

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    credentials: 'include',
  })

  const data = await res.json()
  if (res.ok) {
    message.value = 'Connexion réussie !'
    errorMessage.value = ''
    sessionStorage.setItem('user', JSON.stringify(data))
    router.push('/succesLogin')
  } else {
    errorMessage.value = data.message || 'Utilisateur inexistant'
    message.value = ''
  }
}

const handleRegister = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs.'
    return
  }

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
    credentials: 'include',
  })

  const data = await res.json()
  if (res.ok) {
    message.value = 'Inscription réussie !'
    errorMessage.value = ''
  } else {
    errorMessage.value = data.message || 'Erreur lors de l’inscription.'
    message.value = ''
  }
}
</script>

<template>
  <div class="fixed top-4 left-4 z-50">
    <!-- Bouton principal avec une icône -->
    <button
      @click="toggleMenu"
      class="p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-haspopup="true"
    >
      <User class="w-9 h-9" />
    </button>

    <!-- Menu contextuel -->
    <div
      v-if="isMenuOpen"
      class="absolute mt-2 w-64 bg-white rounded-lg shadow-lg z-50 p-4 space-y-4"
    >
      <h3 class="text-lg font-semibold text-gray-700">Authentification</h3>
      <input
        v-model="username"
        type="text"
        placeholder="Nom d'utilisateur"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <!-- Messages -->
      <p v-if="message" class="text-sm text-green-600">{{ message }}</p>
      <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
      <div class="flex justify-between space-x-2">
        <button
          @click="handleLogin"
          class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Se connecter
        </button>
        <button
          @click="handleRegister"
          class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all duration-300"
        >
          S'inscrire
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajout de styles pour le menu */
@media (max-width: 768px) {
  .absolute {
    width: 90%;
    left: 5%;
  }
}
</style>
