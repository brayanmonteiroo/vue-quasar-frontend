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
              <q-input filled v-model="password" :type="showPassword ? 'text' : 'password'" label="Senha" required>
                <template #append>
                  <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="showPassword = !showPassword" />
                </template>
              </q-input>
              <q-input filled v-model="password_confirmation" :type="showPasswordConfirmation ? 'text' : 'password'"
                label="Confirme a senha" required>
                <template #append>
                  <q-icon :name="showPasswordConfirmation ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="showPasswordConfirmation = !showPasswordConfirmation" />
                </template>
              </q-input>
              <div>
                <q-btn push label="Registrar" type="submit" color="primary" class="full-width" />
              </div>
              <div class="row items-center justify-between q-mt-md">
                <q-btn flat label="Voltar para o login" icon="arrow_back" @click="goLogin" color="primary"
                  class="text-weight-bold" />
                <q-btn flat label="Esqueci minha senha" icon="help_outline" @click="goForgot" color="primary"
                  class="text-weight-bold" />
              </div>
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
import { useQuasar } from 'quasar'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
const router = useRouter()
const $q = useQuasar()

const onSubmit = async () => {
  try {
    // Envia uma requisição POST para a API de registro. Aqui acontece o registro do usuário.
    await axios.post('http://localhost:8000/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    })

    // Se o registro for bem-sucedido, redireciona para a página de login
    router.push('/')

    // Exibe uma notificação de sucesso se o registro for bem-sucedido
    $q.notify({
      type: 'positive',
      message: 'Usuário registrado com sucesso! Faça login.',
      position: 'top',
      timeout: 3000
    })

    // Limpa os campos após sucesso para evitar reenvios acidentais
    name.value = ''
    email.value = ''
    password.value = ''
    password_confirmation.value = ''

  } catch (err) {
    // Se ocorrer um erro, exibe uma notificação
    $q.notify({
      type: 'negative',
      message: err.response?.data?.message || 'Erro ao registrar usuário',
      position: 'top',
      timeout: 4000
    })
  }
}

// Função para redirecionar para a página de login usada no botão "Voltar para o login"
function goLogin() {
  router.push('/')
}

// Função para redirecionar para a página de recuperação de senha usada no botão "Esqueci minha senha"
const goForgot = () => router.push('/forgot-password')
</script>

<style>
.bg-image {
  background: #202020;
}
</style>