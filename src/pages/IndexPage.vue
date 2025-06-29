<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="email" label="E-mail" type="email" required />
          <q-input filled v-model="password" label="Senha" type="password" required />
          <q-btn label="Entrar" type="submit" color="primary" />
        </q-form>
        <div class="q-mt-md">
          <q-btn flat label="Registrar" @click="goRegister" />
          <q-btn flat label="Esqueci minha senha" @click="goForgot" />
        </div>
        <div v-if="error" class="q-mt-md text-negative">{{ error }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

// Função para lidar com o envio do formulário e autenticação do usuário.
const onSubmit = async () => {
  // Limpa a mensagem de erro antes de tentar fazer login
  error.value = ''
  try {
    // Envia uma requisição POST para a API de login
    const response = await axios.post('http://localhost:8000/api/auth/login', {
      email: email.value,
      password: password.value
    })
    // Salve o token se quiser autenticação persistente
    localStorage.setItem('token', response.data.access_token)
    // Redirecione para o dashboard ou página protegida
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao fazer login'
  }
}

const goRegister = () => router.push('/register')
const goForgot = () => router.push('/forgot-password')
</script>
