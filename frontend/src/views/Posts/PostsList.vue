<script setup>
import PostsListItem from "@/components/Posts/PostsListItem.vue";
import VPaginator from "primevue/paginator";

import {onMounted, ref, watch} from "vue";
import postsApi from "@/api/postsApi";

const postsCount = ref(0)
const postsList =  ref([])
const postsLimit = ref(10)
const postsPage = ref(1)
const loading = ref(false)

onMounted(() => {
  getPosts()
})

watch(postsPage, async (newValue, oldValue) => {
  if (newValue === oldValue) {
    return
  }

  await getPosts()

  window.scrollTo({
    behavior: 'smooth',
    top: 0
  })
})

const getPosts = async () => {
  loading.value = true

  await postsApi
    .getAllPosts({
      page: postsPage.value,
      limit: postsLimit.value
    })
    .then((data) => {
      postsCount.value = data.count
      postsList.value = data.rows
    })

  loading.value = false
}

const onLikePost = (post) => {
  postsApi
      .likePost(post.id)
      .then((data) => {
        post.likesCount = data.likesCount
        post.isLiked = data.isLiked
      })
}
</script>

<template>
  <div class="post-list">
    <template v-if="postsList.length">
      <PostsListItem
          v-for="post in postsList"
          :post="post"
          :key="post.id"
          @like-post="onLikePost(post)"
      />
    </template>

    <template v-else>
      Создайте новый пост
    </template>

    <VPaginator
      v-if="postsCount > postsLimit"
      class="post-paginator"
      :first="postsLimit * (postsPage - 1)"
      :total-records="postsCount"
      :rows="postsLimit"
      @page="({ page }) => postsPage = page + 1"
    />
  </div>
</template>

<style scoped>
.post-paginator {
  margin-top: 1rem;
}
</style>