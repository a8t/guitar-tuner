<template>
  <router-view/>
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

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
