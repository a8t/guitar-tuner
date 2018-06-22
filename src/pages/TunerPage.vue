<template>
  <div class="tunerpage-root">
    <TunerProvider class="tuner-provider" />
  </div>
</template>

<script>
import TunerProvider from '@/components/Tuner/TunerProvider'

export default {
  name: 'TunerPage',
  computed: {},
  components: {
    TunerProvider,
  },
}
</script>

<style lang="scss" scoped>
.tunerpage-root {
  height: 100vh;
  background: var(--primary-bg);
  display: flex;
  flex-direction: column;

  @supports (display: grid) {
    @media screen and (min-width: 800px) {
      display: grid;
      grid-template-areas:
        '. . .'
        '. tuner .'
        '. . .';
      grid-template-rows:
        7vh
        1fr
        10vh;
      grid-template-columns: 1fr auto 1fr;
    }
  }
}
.tuner-provider {
  height: 100%;
  z-index: 3;
}
</style>
