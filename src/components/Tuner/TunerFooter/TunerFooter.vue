<template>
  <footer>
    <div class="footer-title">
      <h3>
        Tuner mode
      </h3>
    </div>

    <div class="tuner-modes">
      <TunerMode url="/tuner/needle-tuner"
        label="Needle">
        <Needle/>
      </TunerMode>
    </div>

  </footer>
</template>

<script>
import Needle from '@/components/icons/NeedleIcon'
import TunerMode from './TunerMode'

export default {
  name: 'TunerFooter',
  components: { TunerMode, Needle },
}
</script>

<style scoped>
footer {
  --title-width: 100;
  margin-top: auto;
  position: relative;
}

.footer-title {
  margin-left: auto;
  margin-right: auto;
  width: calc(var(--title-width) * 1px);
}

.footer-title h3 {
  color: #666;
}

.footer-title::before {
  position: absolute;
  width: calc(50vw - var(--title-width) * 0.5px - 10px);
  content: '';
  background: #999;
  height: 2px;
  position: absolute;
  left: 0;
  top: 10px;
}

.footer-title::after {
  position: absolute;
  width: calc(50vw - var(--title-width) * 0.5px - 10px);
  content: '';
  background: #999;
  height: 2px;
  position: absolute;
  right: 0;
  top: 10px;
}

.tuner-modes {
  margin: 20px 0;
}
</style>
