<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Registrar</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="name" label="Nome" required />
          <q-input filled v-model="email" label="E-mail" type="email" required />
          <q-input filled v-model="password" label="Senha" type="password" required />
          <q-input filled v-model="password_confirmation" label="Confirme a senha" type="password" required />
          <q-btn label="Registrar" type="submit" color="primary" />
          <q-btn flat label="Voltar para o login" color="primary" class="q-mt-md" @click="goLogin" />
        </q-form>
        <div v-if="message" class="q-mt-md text-positive">{{ message }}</div>
        <div v-if="error" class="q-mt-md text-negative">{{ error }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const message = ref('')
const error = ref('')
const router = useRouter()

const onSubmit = async () => {
  message.value = ''
  error.value = ''
  try {
    await axios.post('http://localhost:8000/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    message.value = 'Usuário registrado com sucesso! Faça login.'
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao registrar'
  }
}

function goLogin() {
  router.push('/')
}
</script>
