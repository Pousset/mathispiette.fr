<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Inscription / Connexion</h2>
    <form @submit.prevent="handleAction">
      <input
        v-model="username"
        type="text"
        placeholder="Nom d'utilisateur"
        class="input"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="input mt-2"
        required
      />
      <div class="flex space-x-4 mt-4">
        <button type="submit" class="btn" @click="action = 'register'">
          S'inscrire
        </button>
        <button type="submit" class="btn" @click="action = 'login'">
          Se connecter
        </button>
      </div>
      <p v-if="message" class="mt-2 text-sm text-green-600">{{ message }}</p>
      <p v-if="errorMessage" class="mt-2 text-sm text-red-600">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const message = ref('')
const errorMessage = ref('')
const action = ref('register') // Par défaut, l'action est "register"
const router = useRouter()

const handleAction = async () => {
  if (action.value === 'register') {
    await register()
  } else if (action.value === 'login') {
    await login()
  }
}

const register = async () => {
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
    username.value = ''
    password.value = ''
  } else {
    errorMessage.value = data.message
    message.value = ''
  }
}

const login = async () => {
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
    router.push('/succesLogin') // Redirection vers la vue "succesLogin"
  } else {
    errorMessage.value = data.message || 'Utilisateur inexistant'
    message.value = ''
  }
}
</script>

<style scoped>
.input {
  @apply border p-2 w-full rounded;
}
.btn {
  @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
}
</style>
