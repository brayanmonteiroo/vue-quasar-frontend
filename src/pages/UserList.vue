<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Usuários Cadastrados</div>
      </q-card-section>
      <q-table
        :rows="users"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :loading="loading"
        no-data-label="Nenhum usuário encontrado"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const loading = ref(false)
const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Nome', field: 'name', align: 'left' },
  { name: 'email', label: 'E-mail', field: 'email', align: 'left' }
]

const fetchUsers = async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:8000/api/user-list', {
      headers: { Authorization: `Bearer ${token}` }
    })
    users.value = response.data
  } catch (e) {
    users.value = []
  }
  loading.value = false
}

onMounted(fetchUsers)
</script>