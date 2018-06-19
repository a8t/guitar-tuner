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
  min-height: 600px;
  height: calc(100vh - var(--header-height) * 1px);
  display: flex;
  flex-direction: column;
  background: var(--primary-bg);
}

.tuner-provider {
  margin-top: var(--header-height) * 1px;
  height: 100%;
  z-index: 3;
}
</style>
