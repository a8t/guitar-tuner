<template>
  <div class="tuner-container">
    <div class="tuner-header">WebTuner</div>
    <div class="tuner-body">
      <sharp-flat-indicator class="sharp-flat-indicator"
        v-bind="{distanceInCents, isMicListening}"></sharp-flat-indicator>
      <router-view class="tuner-display"
        v-bind="{nearestNote, distanceInCents, isMicListening, toggleMicrophone}"
      />
      <div>
        <button id="toggleButton"
          type="primary"
          size="large"
          :class="{'mic-toggle': true, 'is-listening': isMicListening}"
          @mousedown="handleToggleMouseDown"
          @mouseup="handleToggleMouseUp">
          <p class="mic-toggle--primary">
            {{isMicListening ? 'Stop': 'Start'}}
          </p>
        </button>
        <p class="mic-toggle--secondary">
          (or press spacebar)
        </p>
      </div>
    </div>
    <tuner-footer/>
  </div>
</template>

<script>
import tunerMixin from '@/components/mixins/tunerMixin'
import RecordingIndicator from '@/components/shared/RecordingIndicator'
import SharpFlatIndicator from '@/components/Tuner/sharp-flat-indicator'
import TunerFooter from '@/components/Tuner/TunerFooter/TunerFooter'

export default {
  name: 'TunerProvider',
  mixins: [tunerMixin],
  components: {
    RecordingIndicator,
    SharpFlatIndicator,
    TunerFooter,
  },
  mounted() {
    const toggle = document.querySelector('#toggleButton')
    this.keyDownListener = event => {
      if (event.key === 'Space' || (event.code === 'Space' && !event.repeat)) {
        event.preventDefault()
        toggle.classList.add('active')
      }
    }
    this.keyUpListener = event => {
      if (event.key === 'Space' || (event.code === 'Space' && !event.repeat)) {
        event.preventDefault()
        event.stopPropagation()

        toggle.classList.remove('active')
        this.toggleMicrophone()
      }
    }

    toggle.addEventListener('keydown', this.keyDownListener)
    toggle.addEventListener('keyup', this.keyUpListener)
    window.addEventListener('keydown', this.keyDownListener)
    window.addEventListener('keyup', this.keyUpListener)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDownListener)
    window.removeEventListener('keyup', this.keyUpListener)
  },
  computed: {
    needleTransform: function() {
      return `rotate(${this.distanceInCents} 179.24 201.58)`
    },
  },
  methods: {
    handleToggleMouseDown: function(e) {
      e.currentTarget.blur()
    },
    handleToggleMouseUp: function(e) {
      this.toggleMicrophone()
    },
  },
}
</script>

<style lang="scss" scoped>
.tuner-container {
  grid-area: tuner;
  width: 100vw;
  height: calc(100vh);
  min-height: 600px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 5px 5px 24px 0px rgba(0, 0, 0, 0.25);
  position: relative;

  @supports (display: grid) {
    @media screen and (min-width: 800px) {
      height: calc(100vh - var(--header-height) * 1px);

      max-width: 80vw;
      display: grid;
      min-height: unset;
      height: 100%;
      --modes-width: 100;
      grid-template-areas:
        'modes tuner-header'
        'modes tuner-body';
      grid-template-columns: calc(var(--modes-width) * 1px) 1fr;
      grid-template-rows:
        calc(var(--header-height) * 1px)
        1fr;
      overflow: scroll;
    }
  }
}

.tuner-header {
  width: 100%;
  grid-area: tuner-header;
  z-index: 123;
  color: white;
  font-size: 32px;
  background: var(--primary);
  height: calc(var(--header-height) * 1px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 24px 0px rgba(0, 0, 0, 0.25);
}

.tuner-body {
  grid-area: tuner-body;
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: auto;
  min-height: 400px;
}

.tuner-display {
  width: 80vw;
  @media screen and (min-width: 800px) {
    width: 50vw;
  }
  max-width: 700px;
  height: 100%;
  max-height: 35vh;
}

.mic-toggle {
  background: rgba(38, 170, 137, 0.6);
  width: 120px;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 30px;
  &.active,
  &:active {
    background: rgba(38, 170, 137, 0.8);
  }

  &.is-listening {
    color: white;
    background: rgba(216, 67, 67, 0.722);

    &.active,
    &:active {
      background: rgba(216, 67, 67, 0.922);
    }
  }
  p {
    color: white;

    font-size: 24px;
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
