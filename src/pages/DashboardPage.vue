<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <h2>Bem-vindo ao Dashboard!</h2>
      <p>Você está logado.</p>
      <q-btn label="Sair" color="negative" class="q-mt-md" @click="logout" />
    </div>
  </q-page>
</template>

<script setup>
import { useAuth } from 'src/composables/useAuth'

const { logout } = useAuth()
</script>
