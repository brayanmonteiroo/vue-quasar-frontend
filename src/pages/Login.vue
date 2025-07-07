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
                Entrar
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input filled v-model="email" label="E-mail" type="email" required />
              <q-input filled v-model="password" :type="showPassword ? 'text' : 'password'" label="Senha" required>
                <template #append>
                  <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="showPassword = !showPassword" />
                </template>
              </q-input>
              <div align="center">
                <q-btn push label="Entrar" type="submit" color="primary" class="full-width" />
              </div>
              <div class="row items-center justify-between q-mt-sm">
                <q-btn flat label="Registrar" icon="person_add" @click="goRegister" color="primary"
                  class="text-weight-bold" />
                <q-btn flat label="Esqueci minha senha" icon="help_outline" @click="goForgot" color="primary"
                  class="text-weight-bold" />
              </div>
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
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useQuasar } from 'quasar'

const email = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)
const router = useRouter()
const $q = useQuasar()

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
    // Se ocorrer um erro, exibe uma notificação
    $q.notify({
      type: 'negative',
      message: err.response?.data?.message || 'Erro ao fazer login',
      position: 'top',
      timeout: 3000
    })
  }
}

const goRegister = () => router.push('/register')
const goForgot = () => router.push('/forgot-password')
</script>

<style>
.bg-image {
  background: #202020;
}
</style>
