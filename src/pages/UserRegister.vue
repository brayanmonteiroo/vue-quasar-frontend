<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '80%' } : { 'width': '30%' }">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="icons/logo-sistema.png" alt="Logo do Sistema" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Registrar
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input filled v-model="name" label="Nome" required />
              <q-input filled v-model="email" label="E-mail" type="email" required />
              <q-input filled v-model="password" label="Senha" type="password" required />
              <q-input filled v-model="password_confirmation" label="Confirme a senha" type="password" required />
              <div>
                <q-btn label="Registrar" type="submit" color="primary" />
              </div>
              <div class="q-mt-md">
                <q-btn flat label="Voltar para o login" @click="goLogin" />
              </div>
              <div v-if="message" class="q-mt-md text-positive">{{ message }}</div>
              <div v-if="error" class="q-mt-md text-negative">{{ error }}</div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
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

<style>
.bg-image {
  background: #202020;
}
</style>