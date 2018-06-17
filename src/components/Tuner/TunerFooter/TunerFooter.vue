<template>

  <footer>
    <h3 class="footer-title">
      Tuner mode
    </h3>

    <div class="tuner-modes">
      <TunerMode icon="needle" label="Needle" />
    </div>

  </footer>
</template>

<script>
import TunerMode from './TunerMode'

export default {
  name: 'TunerFooter',
  components: { TunerMode },
}
</script>

<style scoped>
footer {
  margin-top: auto;
  position: relative;
}

.footer-title {
  color: #666;
}

.footer-title::before {
  position: absolute;
  width: 40vw;
  content: '';
  background: #999;
  height: 2px;
  position: absolute;
  left: 0;
  top: 10px;
}

.footer-title::after {
  position: absolute;
  width: 40vw;
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
