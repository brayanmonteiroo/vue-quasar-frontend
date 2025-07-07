<template>
  <div>
    <q-item style="max-width: 420px" v-for="msg in messages" :key="msg.id" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img :src="msg.avatar">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ msg.name }}</q-item-label>
        <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        {{ msg.time }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Messages",
  setup() {
    return {
      messages: [
        {
          id: 1,
          name: 'Brayan',
          msg: 'Olá! Seja bem-vindo ao sistema.',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          time: '10:00'
        },
        {
          id: 2,
          name: 'Sistema',
          msg: 'Seu cadastro foi realizado com sucesso.',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
          time: '10:05'
        },
        {
          id: 3,
          name: 'Admin',
          msg: 'Se precisar de ajuda, entre em contato com o suporte.',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          time: '10:10'
        }
      ],
    }
  }
})
</script>

<style scoped></style>
