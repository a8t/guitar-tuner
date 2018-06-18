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
  created: function() {
    window.scrollTo(0, 1)
  },
}
</script>

<style>
body {
  height: unset;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
  margin-top: 50px;
}

.header {
  z-index: 1000;
  background: var(--primary);
  position: fixed;
  top: 0;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-title {
  color: white;
}
</style>
