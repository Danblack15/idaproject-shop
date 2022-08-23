<template>
  <button :class="['button', {
    'button--disabled': disabled
  }]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  name: 'ButtonUI'
}
</script>

<style lang="scss" scoped>
@import './ButtonUI.scss';
</style>