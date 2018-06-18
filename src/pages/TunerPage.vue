<template>
  <div class="tunerpage-root">
    <TunerProvider class="tuner-provider" />
    <TunerFooter/>
  </div>
</template>

<script>
import TunerProvider from '@/components/Tuner/TunerProvider'
import TunerFooter from '@/components/Tuner/TunerFooter/TunerFooter'

export default {
  name: 'TunerPage',
  computed: {},
  components: {
    TunerProvider,
    TunerFooter,
  },
}
</script>

<style scoped>
.tunerpage-root {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: var(--primary-bg);
}

.tuner-provider {
  height: 100%;
  z-index: 3;
}
</style>
