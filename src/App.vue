<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title">
        WebTuner
      </h1>
    </header>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import 'at-ui-style'
import '@/assets/styles/vars.css'

export default {
  name: 'App',
  mounted: function() {
    window.scrollTo(0, 1)
  },
}
</script>

<style>
body {
  height: unset !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
  margin-top: calc(var(--header-height) * 1px);
}

.header {
  z-index: 1000;
  background: var(--primary);
  position: fixed;
  top: 0;
  height: calc(var(--header-height) * 1px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 24px 0px rgba(0, 0, 0, 0.25);
}

.header-title {
  color: white;
}
</style>
