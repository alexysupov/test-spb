<script setup>
import postsApi from "@/api/postsApi";
import httpStatuses from "@/api/httpStatuses";
import {onBeforeMount, ref} from "vue";
import {useRouter, useRoute} from 'vue-router';
import PostsArticleMain from "@/components/Posts/PostsArticleMain.vue";
import PostsArticleAside from "@/components/Posts/PostsArticleAside.vue";
import commentsApi from "@/api/commentsApi";
import {useUserStore} from "@/store/user";

const postData = ref({})
const postComments = ref([])
const postLoading = ref(false)

const router = useRouter()
const route = useRoute()

onBeforeMount(async () => {
  postLoading.value = true
  await Promise.all([getPostComments(), getPost()])
  postLoading.value = false
})


async function getPost() {
  try {
    postData.value = await postsApi.getOnePost(route.params.id)
  }
  catch (e) {
    if (e.response.status === httpStatuses.NOT_FOUND) {
      await router.push({ name: 'not-found' })
    }
  }
}

async function getPostComments() {
  postComments.value = await commentsApi.getPostComments(route.params.id)
}

async function onCreateComment(commentData) {
  await commentsApi.createPostComment(route.params.id, commentData)
  await getPostComments()
}
async function onDeleteComment(comment) {
  await commentsApi.deletePostComment(comment.id)
  await getPostComments()
}
</script>

<template>
  <div
      v-if="!postLoading"
      class="post-article"
  >
    <PostsArticleMain
      :post="postData"
      class="post-main"
    />
    <PostsArticleAside
      class="post-aside"
      :comments="postComments"
      @create-comment="onCreateComment"
      @delete-comment="onDeleteComment"
    />
  </div>
</template>

<style scoped>
.post-article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem
}
.post-aside {
  padding-top: 1.5rem;
}
</style>