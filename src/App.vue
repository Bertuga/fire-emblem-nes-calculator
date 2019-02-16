<template>
  <div id="app">
    <h1>Fire Emblem 1 Calculator</h1>
    <BaseTab />
  </div>
</template>

<script>
import BaseTab from './components/BaseTab'

export default {
  components: {
    BaseTab
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
* { font-family: 'Press Start 2P', cursive;}
body { color: #fff; background: #000}
h1 { text-align: center; }
#app { width: 65%; margin: 0 auto; }
@media(max-width: 490px) {
  #app { width: unset; margin: 0 auto; }
}
</style>
