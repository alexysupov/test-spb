<script>
import Textarea from "primevue/textarea";

export default {
  name: "VTextarea",

  components: {
    Textarea
  },

  props: {
    validation: {
      type: Object,
      default: () => ({})
    },
    showErrors: {
      type: Boolean,
      default: true
    }
  },
}
</script>

<template>
  <div class="textarea-wrapper">
    <Textarea
      :class="{ 'p-invalid': validation.$error }"
      class="textarea-element"
      v-bind="$attrs"
    />
    <div
      v-if="validation.$error && showErrors"
      class="textarea-errors"
    >
      <small v-if="validation?.required?.$invalid">
        Обязательное поле
      </small>
      <small v-else-if="validation?.minLength?.$invalid">
        Минимальная длина - {{ validation.minLength.$params.min }}
      </small>
      <small v-else-if="validation?.maxLength?.$invalid">
        Максимальная длина - {{ validation.maxLength.$params.max }}
      </small>
      <small v-else>
        {{ validation.$errors.at(0).$message() }}
      </small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.textarea-element {
  width: 100%;
  resize: vertical;
}
.textarea-errors {
  position: relative;
}
small {
  position: absolute;
  display: block;
  color: var(--red-500);
}
</style>