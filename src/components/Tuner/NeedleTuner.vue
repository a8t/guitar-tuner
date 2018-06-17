<template>
  <div class="container">
    <NeedleDisplay class="needle-display" v-bind="{distanceInCents, isMicListening}" />
    <div class="note-display">
      {{nearestNote}}
    </div>
    <Button class="mic-toggle" @click="toggleMicrophone">
      {{isMicListening ? 'Stop' : 'Start'}}
    </Button>
  </div>
</template>

<script>
import NeedleDisplay from '@/components/Tuner/NeedleDisplay'
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
  computed: {
    needleTransform: function() {
      return `rotate(${this.distanceInCents} 179.24 201.58)`
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
}

.needle-display {
  margin-top: auto;
  max-width: 600px;
}

.note-display {
  height: 80px;
  font-size: 60px;
}

.mic-toggle {
  position: absolute;
  top: 30px;
}
</style>
