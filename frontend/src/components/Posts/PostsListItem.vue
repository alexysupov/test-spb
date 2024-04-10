<script setup>
import VButton from "primevue/button";
import VCard from "primevue/card";

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <VCard class="post-item">
    <template #title>
      {{ post.title }}
    </template>

    <template #content>
      {{ post.text }}
    </template>

    <template #footer>
      <RouterLink :to="`/posts/${post.id}`">
        <VButton>Прочитать</VButton>
      </RouterLink>
    </template>
  </VCard>
</template>

<style scoped>
.post-item {
  margin-top: 1rem;
}
</style>