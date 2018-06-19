<template>
  <div :class="{on: on, 'indicator-container': true}">
    <div class="indicator"></div>
    <p class="label">
      {{on ? "On" : "Off"}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'RecordingIndicator',
  props: {
    on: { type: Boolean, required: true },
    text: String,
  },
}
</script>

<style lang="scss" scoped>
.indicator-container {
  width: 30px;
}

.on {
  .indicator {
    background: red;
  }
}

.indicator {
  height: 30px;
  width: 30px;
  background: grey;
  border-radius: 50%;
}
</style>
