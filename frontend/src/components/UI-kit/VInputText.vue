<script>
import InputText from "primevue/inputtext";

export default {
  name: "VInputText",

  components: {
    InputText
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
  <div class="input-wrapper">
    <InputText
      :class="{ 'p-invalid': validation.$error }"
      class="input-element"
      v-bind="$attrs"
    />
    <div
      v-if="validation.$error && showErrors"
      class="input-errors"
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
.input-element {
  width: 100%;
}
.input-errors {
  position: relative;
}
small {
  position: absolute;
  display: block;
  color: var(--red-500);
}
</style>