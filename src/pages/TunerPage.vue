<template>
  <div class="tunerpage-root">
    <TunerProvider class="tuner-provider" />
    <TunerFooter/>
  </div>
</template>

<script>
import NeedleTuner from '@/components/Tuner/NeedleTuner'
import TunerProvider from '@/components/Tuner/TunerProvider'
import TunerFooter from '@/components/Tuner/TunerFooter/TunerFooter'

export default {
  name: 'TunerPage',
  computed: {},
  components: {
    TunerProvider,
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

.tuner-provider {
  margin-top: auto;
}
</style>
