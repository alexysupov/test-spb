<script setup>
import VInputText from "@/components/UI-kit/VInputText.vue";
import VDialog from 'primevue/dialog';
import VButton from "primevue/button";
import {ref} from "vue";
import usersApi from "@/api/usersApi";

const oldPassword = ref('')
const newPassword = ref('')

const emits = defineEmits()

async function save() {
  await usersApi.changePassword(oldPassword.value, newPassword.value)
  close()
}

function close() {
  emits('update:visible', false)
}

</script>

<template>
  <VDialog
      v-bind="$attrs"
      class="profile-password"
      header="Редактировать пароль"
      :modal="true"
      :style="{ width: '25rem' }"
  >
    <form action="">
      Старый пароль <VInputText v-model="oldPassword" type="password" />
      Новый пароль <VInputText v-model="newPassword" type="password" />

      <div class="profile-password__buttons">
        <VButton severity="secondary" @click="close">Отмена</VButton>
        <VButton severity="primary" @click="save">Сохранить</VButton>
      </div>
    </form>
  </VDialog>
</template>

<style scoped>
.profile-password__buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>