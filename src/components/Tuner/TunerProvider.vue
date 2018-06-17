<template>
  <NeedleTuner v-bind="{nearestNote, distanceInCents, isMicListening, toggleMicrophone}" />
</template>

<script>
import tunerMixin from '@/components/mixins/tunerMixin'
import NeedleTuner from '@/components/Tuner/NeedleTuner'

export default {
  name: 'TunerProvider',
  components: {
    NeedleTuner,
  },
  mixins: [tunerMixin],
}
</script>

<style>
</style>
