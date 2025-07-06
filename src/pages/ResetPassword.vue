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
                Redefinir senha
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <!-- Campos email e token ficam escondidos -->
              <input type="hidden" v-model="email" />
              <input type="hidden" v-model="token" />
              <q-input filled v-model="password" label="Nova senha" type="password" required />
              <q-input filled v-model="password_confirmation" label="Confirme a nova senha" type="password" required />
              <div>
                <q-btn label="Redefinir senha" type="submit" color="primary" />
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const email = ref('')
const token = ref('')
const password = ref('')
const password_confirmation = ref('')
const message = ref('')
const error = ref('')

onMounted(() => {
  email.value = route.query.email || ''
  token.value = route.query.token || ''
})

const onSubmit = async () => {
  message.value = ''
  error.value = ''
  try {
    const response = await axios.post('http://localhost:8000/api/auth/reset-password', {
      email: email.value,
      token: token.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })
    message.value = response.data.message
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao redefinir senha'
  }
}
</script>

<style>
.bg-image {
  background: #202020;
}
</style>