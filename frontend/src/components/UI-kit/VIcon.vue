<script>
export default {
  name: "VIcon",

  props: {
    name: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<template>
  <i class="pi" :class="name" :style="{ fontSize: size }" />
</template>

<style scoped>
@import 'primeicons/primeicons.css';
</style>