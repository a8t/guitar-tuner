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
    toggleMicrophone: function() {
      if (this.isMicListening) {
        this.$_tunerMixin_stopUpdatingNoteAndDistance()
      } else {
        requestAnimationFrame(this.$_tunerMixin_updateNoteAndDistance)
        this.tuner.connectMicrophone()
      }

      this.isMicListening = !this.isMicListening
    },

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
