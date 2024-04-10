<script setup>
import VButton from "primevue/button";
import VInputText from "@/components/UI-kit/VInputText.vue";

import postsApi from "@/api/postsApi";

import {ref} from "vue";
import {useRouter} from "vue-router";

import {useVuelidate} from "@vuelidate/core";
import {required, minLength, maxLength} from "@vuelidate/validators";

const newPost = ref({
  title: '',
  text: '',
  author: ''
})

const router = useRouter()

const v$ = useVuelidate({
  newPost: {
    title: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(15)
    },
    text: {
      required,
      minLength: minLength(5),
    },
  }
}, { newPost })

function createPost() {
  if (v$.value.$touch() || v$.value.$error) {
    return
  }

  postsApi
    .createPost(newPost.value)
    .then((post) => {
      router.push(`/posts/${post.id}`)
    })
}
</script>

<template>
  <div class="posts-create">
    <form class="posts-form">
      <VInputText
        placeholder="Название"
        :validation="v$.newPost.title"
        v-model="newPost.title"
        @keyup.enter="createPost"
      />
      <VInputText
        placeholder="Примечание"
        :validation="v$.newPost.text"
        v-model="newPost.text"
        @keyup.enter="createPost"
      />
      <VButton @click="createPost">
        Создать
      </VButton>
    </form>
  </div>
</template>

<style scoped>
.posts-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 2px solid var(--green-500);
  border-radius: 8px;
  display: grid;
  gap: 1.5rem;
}
</style>