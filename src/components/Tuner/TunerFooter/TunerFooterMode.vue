<template>
  <router-link :to="url"
    class="mode-container"
    replace>
    <slot></slot>
    <p class="label">
      {{label}}
    </p>
  </router-link>
</template>

<script>
export default {
  name: 'TunerMode',
  props: { label: String, url: String },
}
</script>

<style lang="scss" scoped>
.mode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.router-link-active {
    fill: var(--primary);
    background: rgba(119, 173, 255, 0.1);
    box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.15);
  }
}

.label {
  font-size: 16px;
  .router-link-active & {
    font-weight: bold;
    color: var(--primary);
  }
}
</style>
