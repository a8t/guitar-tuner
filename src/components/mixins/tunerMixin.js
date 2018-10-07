import TunerAudioContext from '@/assets/TunerAudioContext'

export default {
  data() {
    return {
      tuner: new TunerAudioContext(),
      distanceInCents: 0,
      nearestNote: '',
      isMicListening: false,
    }
  },
  destroyed() {
    this.$_tunerMixin_stopUpdatingNoteAndDistance()
  },
  methods: {
    // Toggles whether the microphone is listening and updating data
    toggleMicrophone: function() {
      if (this.isMicListening) {
        this.$_tunerMixin_stopUpdatingNoteAndDistance()
      } else {
        requestAnimationFrame(this.$_tunerMixin_updateNoteAndDistance)
        this.tuner.connectMicrophone()
      }

      this.isMicListening = !this.isMicListening
    },

    // To be run on each tick. Determines the frequency we're hearing and
    // updates the state with the nearest note + distance to it
    $_tunerMixin_updateNoteAndDistance: function() {
      const detectedFundamental = this.tuner.getDetectedFundamental()
      const [nearestNote, nearestNoteFreq] = TunerAudioContext.nearestNoteFromFreq(
        detectedFundamental,
      )

      this.nearestNote = nearestNote.replace(/[0-9]/g, '')
      this.distanceInCents = TunerAudioContext.distanceInCents({
        referenceFreq: nearestNoteFreq,
        checkFreq: detectedFundamental,
      })

      if (this.isMicListening) {
        requestAnimationFrame(this.$_tunerMixin_updateNoteAndDistance)
      }
    },

    // Shuts off the mic and stops frequency analysis
    $_tunerMixin_stopUpdatingNoteAndDistance: function() {
      requestAnimationFrame(() => {
        this.tuner.disconnectMicrophone()
        this.distanceInCents = 0
        this.nearestNote = ''
        this.$forceUpdate()
      })
    },
  },
}
