<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Inscription</h2>
    <form @submit.prevent="register">
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
      <button type="submit" class="btn mt-4">S'inscrire</button>
      <p v-if="message" class="mt-2 text-sm text-green-600">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const message = ref('')

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
    username.value = ''
    password.value = ''
  } else {
    message.value = data.message
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
