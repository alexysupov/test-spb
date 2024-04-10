<script setup>
import {useUserStore} from "@/store/user"
import {onBeforeMount, ref} from "vue"

import BaseHeader from "@/components/Base/BaseHeader.vue"
import BaseFooter from "@/components/Base/BaseFooter.vue"
import BaseWrapper from "@/components/Base/BaseWrapper.vue"

const userStore = useUserStore()
const userLoading = ref(true)

onBeforeMount(async () => {
  await userStore.getUser()
  userLoading.value = false
})
</script>

<template>
  <template v-if="!userLoading">
    <BaseHeader class="base-header" />

    <BaseWrapper
        class="base-wrapper"
        tag="main"
    >
      <RouterView />
    </BaseWrapper>

    <BaseFooter class="base-footer" />
  </template>
</template>

<style scoped>
.base-wrapper {
  margin-top: 2rem;
}
</style>
