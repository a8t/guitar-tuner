<template>
  <svg viewBox="0 0 100 100">
    <circle fill="none"
      stroke-width="2"
      id="circle"
      cx="50%"
      cy="50%"
      :class="classObj"
      r="45" />
    <text x="50%"
      y="55%"
      text-anchor="middle">
      {{nearestNote}}
    </text>
  </svg>
</template>

<script>
export default {
  name: 'StrobeDisplay',
  data() {
    return {}
  },
  props: {
    nearestNote: String,
    distanceInCents: Number,
    isMicListening: Boolean,
  },
  mounted() {
    this.c = document.querySelector('#circle')
    this.length = this.c.getTotalLength()
    const numGaps = 8
    this.c.style.strokeDasharray = `${this.length / (2 * numGaps)} ${this.length / (2 * numGaps)}`
    requestAnimationFrame(this.rotateCircle)
  },
  destroyed() {
    cancelAnimationFrame(this.rotateCircle)
  },
  computed: {
    classObj: function() {
      return {
        tuned: this.distanceInCents < 2 && this.distanceInCents > -2,
        disabled: !this.isMicListening,
      }
    },
  },
  methods: {
    rotateCircle: function() {
      const difference = 0.3 * this.distanceInCents
      this.c.style.strokeDashoffset =
        (Number(this.c.style.strokeDashoffset) + difference) % this.length
      requestAnimationFrame(this.rotateCircle)
    },
  },
}
</script>

<style lang="scss" scoped>
#circle {
  transition: stroke-dashoffset 0.000002s;
  stroke: var(--high-contrast-bg);

  &.disabled {
    stroke: var(--disabled) !important;
  }
  &.tuned {
    stroke: green;
  }
}
</style>
