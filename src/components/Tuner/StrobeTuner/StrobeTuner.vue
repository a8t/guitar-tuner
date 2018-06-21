<template>
  <div class="strobe-tuner--container">
    <div class="strobe-tuner">
      <strobe-display class="strobe-display"
        v-bind="{distanceInCents, isMicListening, nearestNote}" />

      <recording-indicator class="needle-recording-indicator"
        :on="isMicListening" />
      <div>

        <Button id="toggleButton"
          type="primary"
          size="large"
          class="mic-toggle"
          @click="handleToggleClick">
          <p class="mic-toggle--primary">
            {{isMicListening ? 'Stop': 'Start'}}
          </p>
        </Button>
        <p class="mic-toggle--secondary">
          (or press spacebar)
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import StrobeDisplay from '@/components/Tuner/StrobeTuner/StrobeDisplay'
import RecordingIndicator from '@/components/shared/RecordingIndicator'
import { Button } from 'at-ui'

export default {
  name: 'StrobeTuner',
  components: {
    StrobeDisplay,
    Button,
    RecordingIndicator,
  },
  props: {
    nearestNote: String,
    distanceInCents: Number,
    isMicListening: Boolean,
    toggleMicrophone: Function,
  },
  mounted() {
    this.startStopListener = event => {
      if (event.key === 'Space' || event.code === 'Space') {
        event.preventDefault()
        this.toggleMicrophone()
      }
    }

    window.addEventListener('keypress', this.startStopListener)
  },
  destroyed() {
    window.removeEventListener('keypress', this.startStopListener)
  },
  computed: {
    needleTransform: function() {
      return `rotate(${this.distanceInCents} 179.24 201.58)`
    },
  },
  methods: {
    handleToggleClick: function(e) {
      e.currentTarget.blur()
      this.toggleMicrophone()
    },
  },
}
</script>

<style lang="scss" scoped>
.strobe-tuner--container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  padding: 20px;
}

.strobe-tuner {
  width: 100vw;
  background: var(--primary-bg);
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 900px) and (min-height: 650px) {
    & {
      position: relative;
      width: 80vw;
      max-width: 800px;
      background: white;
      padding: 40px;
      border-radius: 4px;
      box-shadow: 5px 5px 32px 0px rgba(0, 0, 0, 0.75);
    }
  }
}

.strobe-display {
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 30vh;
}

.mic-toggle {
  margin-top: 30px;
  p {
    font-size: 24px;
    color: white;
  }
}

.mic-toggle--secondary {
  font-size: 18px;
  margin-top: 5px;
}

.needle-recording-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
