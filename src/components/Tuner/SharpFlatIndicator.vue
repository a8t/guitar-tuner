<template>
  <svg id="sharpFlatContainer"
    :class="indicatorContainerClass"
    viewBox="0 0 50 30">

    <sharp-icon viewBox="0 0 800 800"
      class="indicator-icon"
      x="64%"
      y="20%" />

    <circle fill="none"
      id="circle"
      cx="10%"
      cy="80%"
      r="3"
      :class="{'is-lit': isMicListening && distanceInCents < -tunedDistance}" />

    <svg width="15%"
      class="indicator-icon"
      x="42.7%"
      y="-7"
      viewBox="0 0 155.04 284.94">
      <!-- eslint-disable -->
      <path transform="translate(-73.38 -8.51)"
        d="M226.69,146.12L153,10.28a2.43,2.43,0,0,0-4.27,0L75.11,146.12a10.2,10.2,0,0,0,0,9.73l73.65,135.84a2.43,2.43,0,0,0,4.27,0l73.65-135.84A10.2,10.2,0,0,0,226.69,146.12Zm-37.22,9.73L153,223a2.43,2.43,0,0,1-4.27,0l-36.43-67.19a10.2,10.2,0,0,1,0-9.73l36.43-67.19a2.43,2.43,0,0,1,4.27,0l36.43,67.19A10.2,10.2,0,0,1,189.47,155.84Z" />
    </svg>
    <!-- eslint-enable -->

    <circle fill="none"
      id="circle"
      cx="50%"
      cy="72%"
      r="3"
      :class="{'is-tuned': (isMicListening
                            && distanceInCents <= tunedDistance
                            && distanceInCents >= -tunedDistance)}" />

    <flat-icon viewBox="0 0 800 800"
      class="indicator-icon"
      x="-15%"
      y="20%" />

    <circle fill="none"
      id="circle"
      cx="90%"
      cy="80%"
      r="3"
      :class="{'is-lit': isMicListening && distanceInCents > tunedDistance}" />
  </svg>
</template>

<script>
import SharpIcon from '@/components/icons/SharpIcon'
import FlatIcon from '@/components/icons/FlatIcon'

export default {
  name: 'SharpFlatIindicator',
  components: {
    SharpIcon,
    FlatIcon,
  },
  data() {
    return {
      tunedDistance: 10,
    }
  },
  props: {
    distanceInCents: Number,
    isMicListening: Boolean,
  },
  computed: {
    indicatorContainerClass: function() {
      return {
        'is-enabled': this.isMicListening,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#sharpFlatContainer {
  height: 100px;
  max-width: 100vw;
  min-height: 60px;
  circle,
  .indicator-icon {
    stroke: none;
    fill: var(--disabled);
    opacity: 0.4;
  }

  &.is-enabled {
    .indicator-icon {
      opacity: 1;
      fill: rgba(0, 0, 0, 0.3);
    }
    circle {
      &.is-lit {
        fill: red;
      }
      &.is-tuned {
        fill: green;
      }
    }
  }
}
</style>
