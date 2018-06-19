<template>
  <router-view v-bind="{nearestNote, distanceInCents, isMicListening, toggleMicrophone}"
  />
</template>

<script>
import tunerMixin from '@/components/mixins/tunerMixin'

export default {
  name: 'TunerProvider',
  mixins: [tunerMixin],
}
</script>
