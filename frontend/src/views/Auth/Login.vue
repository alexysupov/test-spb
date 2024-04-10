<script setup>
import { useVuelidate } from '@vuelidate/core'
import {required, minLength, maxLength} from '@vuelidate/validators'

import VInputText from "@/components/UI-kit/VInputText.vue";
import VButton from "primevue/button";
import {reactive} from "vue";
import authApi from "@/api/authApi";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/user";

const userStore = useUserStore()

const user = reactive({
  username: 'test',
  password: '12345678'
})

const router = useRouter()

async function login() {
  await userStore.login(user.username, user.password)
  await router.push('/posts')
}

</script>

<template>
  <div class="login-page">
    <h1>Вход</h1>
    <form class="login-form">
      <VInputText
          v-model="user.username"
          @keyup.enter="login"
      />
      <VInputText
          v-model="user.password"
          @keyup.enter="login"
      />
      <VButton @click="login">
        Отправить
      </VButton>
    </form>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 26px;
}
.login-form {
  padding: 1rem;
  display: grid;
  gap: 1.5rem;
}
</style>