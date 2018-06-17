<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.86 106.25">
    <line x1="103.93" y1="12.58" x2="103.93" y2="0.0" />
    <line x1="199.95" y1="64.16" x2="194.14" y2="66.57" />
    <line x1="143.7" y1="7.91" x2="141.3" y2="13.72" />
    <line x1="64.15" y1="7.91" x2="66.56" y2="13.72" />
    <line x1="7.9" y1="64.16" x2="13.71" y2="66.57" />
    <line x1="1.99" y1="83.66" x2="5.07" y2="84.27" />
    <line x1="17.51" y1="46.19" x2="20.12" y2="47.94" />
    <line x1="46.18" y1="17.52" x2="47.93" y2="20.13" />
    <line x1="83.65" y1="2" x2="84.26" y2="5.08" />
    <line x1="124.2" y1="2" x2="123.59" y2="5.08" />
    <line x1="161.67" y1="17.52" x2="159.92" y2="20.13" />
    <line x1="190.35" y1="46.19" x2="187.73" y2="47.94" />
    <line x1="205.87" y1="83.66" x2="202.78" y2="84.27" />
    <line x1="168.53" y1="39.33" x2="177.42" y2="30.44" />
    <line x1="195.29" y1="104.94" x2="207.86" y2="104.94" />
    <line x1="38.21" y1="40.47" x2="29.16" y2="31.74" />
    <line x1="12.58" y1="105.53" x2="0.01" y2="105.75" />
    <line v-bind:transform="needleTransform" x1="103.93" y1="105.53" x2="103.93" y2="18.82" />
  </svg>
</template>

<script>
export default {
  name: 'NeedleDisplay',
  props: {
    distanceInCents: Number,
    isMicListening: Boolean,
  },
  computed: {
    needleTransform: function() {
      const deg = 90 * this.distanceInCents / 50
      return `rotate(${deg} 103.93 105.53)`
    },
  },
}
</script>

<style scoped>
svg > line,
svg > polyline {
  fill: none;
  stroke: #231f20;
  stroke-miterlimit: 10;
  stroke-linecap: round;
}
</style>
