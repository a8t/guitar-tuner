<template>
  <div class="tuner-container">
    <div class="tuner-body">
      <sharp-flat-indicator class="sharp-flat-indicator"
        v-bind="{distanceInCents, isMicListening}"></sharp-flat-indicator>
      <router-view class="tuner-display"
        v-bind="{nearestNote, distanceInCents, isMicListening, toggleMicrophone}"
      />
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
import tunerMixin from '@/components/mixins/tunerMixin'
import RecordingIndicator from '@/components/shared/RecordingIndicator'
import SharpFlatIndicator from '@/components/Tuner/sharp-flat-indicator'

import { Button } from 'at-ui'

export default {
  name: 'TunerProvider',
  mixins: [tunerMixin],
  components: {
    Button,
    RecordingIndicator,
    SharpFlatIndicator,
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
.tuner-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  padding: 20px;
}

.tuner-body {
  width: 100vw;
  min-height: 500px;
  padding: 40px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 5px 5px 24px 0px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 900px) and (min-height: 650px) {
    & {
      position: relative;
      width: 80vw;
      max-width: 800px;
      padding: 40px;
      border-radius: 4px;
    }
  }
}

.tuner-display {
  width: 100%;
  max-width: 700px;
  height: 100%;
  min-height: 200px;
  max-height: 35vh;
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

.sharp-flat-indicator {
  margin-bottom: 20px;
}
</style>
