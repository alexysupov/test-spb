<script setup>
import {useUserStore} from "@/store/user";
const userStore = useUserStore()
</script>

<template>
  <header>
    <div class="header-links">
      <RouterLink to="/">
        Главная
      </RouterLink>
      <RouterLink to="/posts">
        Посты
      </RouterLink>
      <RouterLink to="/posts/create">
        Создать пост
      </RouterLink>
    </div>
    <div class="header-profile">
      <template v-if="userStore.user">
        <RouterLink to="/profile">
          {{ userStore.user.username }}
        </RouterLink>
        <a @click="userStore.logout">Выйти</a>
      </template>
      <template v-else>
        <RouterLink to="/login">Войти</RouterLink>
        <RouterLink to="/register">Регистрация</RouterLink>
      </template>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background: var(--green-500);
  display: flex;
  padding: 1rem;
  width: 100%;

  a { color: white; }
}
.header-links {
  display: flex;
  gap: 0.5rem;
}
.header-profile {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}
</style>