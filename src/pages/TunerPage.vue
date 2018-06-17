<template>
  <div class="tunerpage-root">

    <NeedleTuner />
    <TunerFooter/>
  </div>
</template>

<script>
import NeedleTuner from '@/components/Tuner/NeedleTuner'
import TunerFooter from '@/components/Tuner/TunerFooter/TunerFooter'

export default {
  name: 'TunerPage',
  computed: {},
  components: {
    NeedleTuner,
    TunerFooter,
  },
}
</script>

<style scoped>
.tunerpage-root {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}
</style>
