<template>
  <footer class="tuner-modes--container">
    <tuner-mode url="/tuner/needle-tuner"
      label="Needle"
      class="tuner-mode">
      <Needle class="footer-icon" />
    </tuner-mode>

    <tuner-mode url="/tuner/strobe-tuner"
      label="Strobe"
      class="tuner-mode">
      <Strobe class="footer-icon" />
    </tuner-mode>
  </footer>
</template>

<script>
import Needle from '@/components/icons/NeedleIcon'
import Strobe from '@/components/icons/StrobeIcon'
import TunerMode from './TunerMode'

export default {
  name: 'TunerFooter',
  components: { TunerMode, Needle, Strobe },
}
</script>

<style lang="scss" scoped>
.footer-title {
  margin-left: auto;
  margin-right: auto;
  width: calc(var(--title-width) * 1px);
}

.footer-title h3 {
  color: #666;
}

.tuner-modes--container {
  width: 100vw;
  margin-top: auto;
  position: relative;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: var(--light-fg);
  border-top: 2px solid;
  border-image-source: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0)
  );
  border-image-slice: 100% 2;

  @supports (display: grid) {
    grid-area: modes;
    @media screen and (min-width: 800px) {
      margin: 0;
      width: calc(var(--modes-width) * 1px);

      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      border-top: none;

      border-right: 1px solid;
      border-image-slice: 1 100%;
    }
  }
}

.tuner-mode {
  padding: 10px 30px;
  @supports (display: grid) {
    @media screen and (min-width: 800px) {
      width: calc(var(--modes-width) * 1px);
      padding: 20px 0;
      border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    }
  }
}

.footer-icon > svg {
  fill: var(--disabled);
  .router-link-active & {
    fill: var(--primary);
  }
}
</style>
