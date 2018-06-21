<template>
  <div class="mode-container">
    <router-link :to="url">
      <slot></slot>
      <p class="label">
        {{label}}
      </p>
    </router-link>
  </div>
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
}

.label {
  font-size: 16px;
  .router-link-active & {
    font-weight: bold;
    color: var(--primary);
  }
}
</style>
