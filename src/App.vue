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

export default {
  name: 'App',
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
  background: #6fcf97;
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
