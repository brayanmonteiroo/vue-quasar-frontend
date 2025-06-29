<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Esqueci minha senha</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="email" label="E-mail" type="email" required />
          <q-btn label="Enviar link de redefinição" type="submit" color="primary" />
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

const email = ref('')
const message = ref('')
const error = ref('')
const router = useRouter()

const onSubmit = async () => {
  message.value = ''
  error.value = ''
  try {
    const response = await axios.post('http://localhost:8000/api/auth/forgot-password', { email: email.value })
    message.value = response.data.message
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao enviar e-mail'
  }
}

function goLogin() {
  router.push('/')
}
</script>
