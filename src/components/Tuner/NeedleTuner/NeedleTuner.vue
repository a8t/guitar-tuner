<template>
  <div class="container">

    <div class="needle-tuner">
      <NeedleDisplay class="needle-display" v-bind="{distanceInCents, isMicListening}"
      />
      <div class="note-display">
        {{nearestNote}}
      </div>

      <Button id="toggleButton" type="primary" size="large" class="mic-toggle"
        @click="handleToggleClick">
        {{isMicListening ? 'Stop / Spacebar' : 'Start / Spacebar'}}
      </Button>
    </div>
  </div>
</template>

<script>
import NeedleDisplay from '@/components/Tuner/NeedleTuner/NeedleDisplay'
import { Button } from 'at-ui'

export default {
  name: 'NeedleTuner',
  components: {
    NeedleDisplay,
    Button,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  padding: 20px;
}

.needle-tuner {
  width: 100vw;
  background: var(--primary-bg);
  padding: 10px;
  border-radius: 4px;

  @media screen and (min-width: 900px) and (min-height: 520px) {
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

.needle-display {
  margin-top: auto;
  width: 80vw;
  max-width: 600px;
  height: 500px;
  max-height: 30vh;
}

.note-display {
  height: 80px;
  font-size: 60px;
  margin-top: 20px;
  margin-bottom: auto;
}

.mic-toggle {
  margin-top: 30px;
}
</style>
