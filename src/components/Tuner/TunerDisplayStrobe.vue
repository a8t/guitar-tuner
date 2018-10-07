<template>
  <svg viewBox="0 0 100 100"
    id="strobeDisplayContainer"
    :class="svgClass">
    <circle fill="none"
      id="strobeDisplayCircle"
      cx="50%"
      cy="50%"
      :class="classObj"
      r="45" />
    <text x="50%"
      y="55%"
      class="strobe-display--label"
      text-anchor="middle">
      {{isMicListening ? nearestNote : "--"}}
    </text>
  </svg>
</template>

<script>
export default {
  name: 'TunerDisplayStrobe',
  data() {
    return {}
  },
  props: {
    nearestNote: String,
    distanceInCents: Number,
    isMicListening: Boolean,
  },
  mounted() {
    this.c = document.querySelector('#strobeDisplayCircle')
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
        'is-tuned': this.nearestNote && this.distanceInCents < 2 && this.distanceInCents > -2,
        'no-note-detected': !this.nearestNote,
        'is-disabled': !this.isMicListening,
      }
    },
    svgClass: function() {
      return {
        'is-enabled': this.isMicListening,
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
#strobeDisplayContainer.is-enabled {
  #strobeDisplayCircle {
    stroke-width: 3px;
  }
}

#strobeDisplayContainer:not(.is-enabled) > .strobe-display--label {
  fill: var(--disabled);
}

#strobeDisplayCircle {
  transition: stroke-dashoffset 0.000002s;
  stroke: rgba(0, 0, 0, 0.5);
  stroke-linecap: round;

  &.is-disabled {
    stroke: var(--disabled) !important;
    stroke-dashoffset: 0 !important;
  }
  &.is-tuned {
    stroke: green;
  }
  &.no-note-detected {
    stroke: rgba(0, 0, 0, 0.6);
  }
}
</style>
