<script setup>
import { useVuelidate } from '@vuelidate/core'
import {required, minLength, maxLength} from '@vuelidate/validators'

import VInputText from "@/components/UI-kit/VInputText.vue";
import VButton from "primevue/button";
import {reactive} from "vue";
import authApi from "@/api/authApi";
import {useRouter} from "vue-router";


const user = reactive({
  username: 'test',
  password: '12345678'
})

const router = useRouter()

const v$ = useVuelidate({
  user: {
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(24)
    }
  }
}, { user })

async function register() {
  if (v$.value.$touch() || v$.value.$error) {
    return
  }

  await authApi.register(user.username, user.password)
  await router.push('/login')
}

</script>

<template>
<div class="register-page">
  <h1>Регистрация</h1>
  <form class="register-form">
    <VInputText
      :validation="v$.user.username"
      v-model="user.username"
      @keyup.enter="register"
    />
    <VInputText
      :validation="v$.user.password"
      v-model="user.password"
      @keyup.enter="register"
    />
    <VButton @click="register">
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
.register-form {
  padding: 1rem;
  display: grid;
  gap: 1.5rem;
}
</style>