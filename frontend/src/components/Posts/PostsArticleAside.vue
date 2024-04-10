<script setup>
import VPanel from 'primevue/panel';
import VButton from "primevue/button";
import VTextarea from "@/components/UI-kit/VTextarea.vue";

import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import VIcon from "@/components/UI-kit/VIcon.vue";
import {useUserStore} from "@/store/user";

const props = defineProps({
  comments: {
    type: Array,
    default: () => []
  },
})

const emits = defineEmits([
    'createComment',
    'deleteComment'
])

const userStore = useUserStore()

const newComment = ref('')
const refComments = ref(null)


const v$ = useVuelidate({
  newComment: {
    required
  }
}, {
  newComment
})

function getCommentTitle({ User, createdAt }) {
  const username = User ? User.username : 'Анонимный пользователь'
  const date = new Date(createdAt)

  return username + ', ' + date.toLocaleDateString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}

function checkShowDelete(comment) {
  return userStore.user?.id === comment?.User.id
}

function createComment() {
  if (v$.value.$touch() || v$.value.$error) {
    return
  }

  v$.value.$reset()

  emits('createComment', {
    text: newComment.value
  })

  if (props.comments.length) {
    refComments.value.scroll({
      behavior: 'smooth',
      top: 0
    })
  }

  newComment.value = ''
}
</script>

<template>
  <div class="list-aside">
    <div
      v-if="comments.length"
      class="list-aside__comments"
      ref="refComments"
    >
      <VPanel
        v-for="comment in comments"
        class="list-aside__comment"
        :key="comment.id"
      >
        <template #header>
          <div class="list-aside__comment-title">
            {{ getCommentTitle(comment) }}
          </div>

          <VIcon
              v-if="checkShowDelete(comment)"
              class="list-aside__comment-delete"
              name="pi-trash"
              size="20px"
              @click="emits('deleteComment', comment)"
          />
        </template>

        {{ comment.text }}
      </VPanel>
    </div>

    <VTextarea
      v-model="newComment"
      class="list-aside__textarea"
      placeholder="Введите комментарий"
      :validation="v$.newComment"
    />

    <VButton
      class="list-aside__button"
      @click="createComment"
    >
      Отправить
    </VButton>
  </div>
</template>

<style lang="scss" scoped>
.list-aside {
  &__comments {
    display: grid;
    gap: 1rem;
    max-height: 500px;
    overflow: auto;
    padding-right: 0.5rem;
  }
  &__comment {
    &-title {
      font-weight: 500;
    }
    &-delete {
      margin-left: auto;
    }
  }
  &__comments + &__textarea {
    margin-top: 1rem;
  }
  &__button {
    margin-top: 0.5rem;
    margin-left: auto;
    display: block;
  }
}
</style>