<script setup>
import VFieldset from "primevue/fieldset";

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="post-main">
    <VFieldset
        class="post-main__content"
        :legend="post.title"
    >
      {{ post.text }}
    </VFieldset>
  </div>
</template>

<style scoped>

</style>