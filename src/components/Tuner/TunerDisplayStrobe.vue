  <template>
  <svg viewBox="0 0 100 100"
    id="strobeDisplayContainer"
    :class="svgClass">
    <circle fill="none"
      id="strobeDisplayCircle"
      ref="strobeDisplayCircle"
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
    return {
      length: 0,
    }
  },
  props: {
    nearestNote: String,
    distanceInCents: Number,
    isMicListening: Boolean,
  },
  mounted() {
    // Takes the SVG circle and turn it into a 'dashed line' circle
    const makeCircleDashed = circleRef => {
      const circle = circleRef
      this.length = circle.getTotalLength()
      const numGaps = 8
      circle.style.strokeDasharray = `${this.length / (2 * numGaps)} ${this.length / (2 * numGaps)}`
    }

    // Refs don't exist on first render, so we use $nextTick.
    this.$nextTick(() => {
      makeCircleDashed(this.$refs.strobeDisplayCircle)
      requestAnimationFrame(this.rotateCircle)
    })
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
      const circle = this.$refs.strobeDisplayCircle
      const difference = 0.3 * this.distanceInCents
      if (circle) {
        circle.style.strokeDashoffset =
          (Number(circle.style.strokeDashoffset) + difference) % this.length
      }
      this.$forceUpdate()
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
