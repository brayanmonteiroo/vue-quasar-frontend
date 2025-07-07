<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Usuários Cadastrados</div>
        <div class="text-subtitle2 text-grey-6">
          Total de usuários: {{ state.users.length }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-table :rows="state.users" :columns="columns" row-key="id" flat bordered :loading="state.loading"
          no-data-label="Nenhum usuário encontrado" loading-label="Carregando usuários..."
          :pagination="{ rowsPerPage: 10 }" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

// Estado reativo para armazenar os usuários e o estado de carregamento. 
const state = reactive({
  users: [],
  loading: false
})

const $q = useQuasar()

// Definição das colunas da tabela. 
const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    sortable: true
  },
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'email',
    label: 'E-mail',
    field: 'email',
    align: 'left',
    sortable: true
  },
  {
    name: 'created_at',
    label: 'Data de Cadastro',
    field: 'created_at',
    align: 'left',
    sortable: true,
    format: (val) => {
      if (!val) return ''
      const date = new Date(val)
      return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR')
    }
  }
]

// Função para buscar usuários. Esta função é chamada quando o componente é montado.
const fetchUsers = async () => {
  state.loading = true
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      console.error('Token não encontrado')
      return
    }

    const response = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.data && response.data.success) {
      state.users = [...response.data.data]

      // Só mostra notify se não tiver usuários
      if (response.data.data.length === 0) {
        $q.notify({
          type: 'info',
          message: 'Nenhum usuário cadastrado no sistema',
          position: 'top',
          timeout: 2000
        })
      }
    } else {
      state.users = []

      $q.notify({
        type: 'warning',
        message: 'Erro ao carregar dados dos usuários',
        position: 'top',
        timeout: 2000
      })
    }

  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    state.users = []

    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Erro ao carregar usuários',
      position: 'top',
      timeout: 3000
    })
  } finally {
    state.loading = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>