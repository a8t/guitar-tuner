<template>

  <footer>
    <div class="footer-title">
      <h3>
        Tuner mode
      </h3>
    </div>

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
  margin-left: auto;
  margin-right: auto;
  width: 100px;
}

.footer-title h3 {
  color: #666;
}

.footer-title::before {
  position: absolute;
  width: calc(50vw - 60px);
  content: '';
  background: #999;
  height: 2px;
  position: absolute;
  left: 0;
  top: 10px;
}

.footer-title::after {
  position: absolute;
  width: calc(50vw - 60px);
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
