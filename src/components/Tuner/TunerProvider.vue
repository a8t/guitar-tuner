<template>
  <div>
    <NeedleTuner v-bind="{nearestNote, distanceInCents, isMicListening, toggleMicrophone}"
    />
  </div>
</template>

<script>
import tunerMixin from '@/components/mixins/tunerMixin'
import NeedleTuner from '@/components/Tuner/NeedleTuner/NeedleTuner'
import NeedleDisplay from '@/components/Tuner/NeedleTuner/NeedleDisplay'

export default {
  name: 'TunerProvider',
  components: {
    NeedleTuner,
    NeedleDisplay,
  },
  mixins: [tunerMixin],
}
</script>

<style>
NeedleDisplay {
  display: none;
}
</style>
