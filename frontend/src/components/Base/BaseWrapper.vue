<script setup>
defineProps({
  tag: {
    type: String,
    tag: 'div'
  }
})
</script>

<template>
  <component :is="tag" class="wrapper">
    <slot></slot>
  </component>
</template>

<style scoped>
.wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>