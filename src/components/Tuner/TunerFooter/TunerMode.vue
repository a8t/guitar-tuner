<template>
  <div class="mode-container">
    <img :src="require(`@/assets/icons/${icon}.svg`)" alt="">
    <p class="label">
      {{label}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TunerMode',
  props: { icon: String, alt: String, label: String },
}
</script>

<style scoped>
.mode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: 45px;
}
</style>
