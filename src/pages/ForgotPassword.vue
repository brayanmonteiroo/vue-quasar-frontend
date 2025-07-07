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
                Esqueci minha senha
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input filled v-model="email" label="E-mail" type="email" required />
              <div align="center">
                <q-btn push label="Enviar link de redefinição" type="submit" color="primary" class="full-width" />
              </div>
              <div class="q-mt-md">
                <div class="row items-center justify-between q-mt-md">
                  <q-btn flat label="Voltar para o login" icon="arrow_back" @click="goLogin" color="primary"
                    class="text-weight-bold" />
                  <q-btn flat label="Registrar" icon="person_add" @click="goRegister" color="primary"
                    class="text-weight-bold" />
                </div>
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

const email = ref('')
const router = useRouter()
const $q = useQuasar()

const onSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/forgot-password', {
      email: email.value
    })

    $q.notify({
      type: 'positive',
      message: response.data.message || 'Link de redefinição enviado para seu e-mail',
      position: 'top',
      timeout: 4000
    })

    // Limpa o campo após sucesso
    email.value = ''

  } catch (err) {
    $q.notify({
      type: 'negative',
      message: err.response?.data?.message || 'Erro ao enviar e-mail de redefinição',
      position: 'top',
      timeout: 4000
    })
  }
}

function goLogin() {
  router.push('/')
}

const goRegister = () => router.push('/register')
</script>

<style>
.bg-image {
  background: #202020;
}
</style>