<template>
  <router-view />
</template>

<script>
// eslint-disable-next-line
import 'at-ui-style'
import '@/assets/styles/vars.css'

export default {
  name: 'App',
  mounted: function() {
    // This is a hack to get the address bar to auto-hide on Chrome Android.
    window.scrollTo(0, 1)
  },
}
</script>

<style>
body {
  /* This is also a hack to get the address bar to auto-hide on Chrome Android. */
  height: unset !important;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
