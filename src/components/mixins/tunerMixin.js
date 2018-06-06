import TunerAudioContext from '@/assets/TunerAudioContext';

export default {
  data() {
    return {
      tuner: new TunerAudioContext(),
      distanceInCents: 0,
      nearestNote: '',
      isMicListening: false,
    };
  },
  destroyed() {
    this.stopUpdatingNoteAndDistance();
  },
  methods: {
    updateNoteAndDistance: function() {
      const detectedFundamental = this.tuner.getDetectedFundamental();
      const [
        nearestNote,
        nearestNoteFreq,
      ] = TunerAudioContext.nearestNoteFromFreq(detectedFundamental);

      this.nearestNote = nearestNote.replace(/[0-9]/g, '');
      this.distanceInCents =
        TunerAudioContext.distanceinCents({
          referenceFreq: nearestNoteFreq,
          checkFreq: detectedFundamental,
        }) || 0;

      if (this.isMicListening) {
        requestAnimationFrame(this.updateNoteAndDistance);
      }
    },

    toggleMicrophone: function() {
      if (this.isMicListening) {
        this.stopUpdatingNoteAndDistance();
      } else {
        requestAnimationFrame(this.updateNoteAndDistance);
        this.tuner.connectMicrophone();
      }

      this.isMicListening = !this.isMicListening;
    },

    stopUpdatingNoteAndDistance: function() {
      requestAnimationFrame(() => {
        this.tuner.disconnectMicrophone();
        this.distanceInCents = 0;
        this.nearestNote = '';
        this.$forceUpdate();
      });
    },
  },
};
