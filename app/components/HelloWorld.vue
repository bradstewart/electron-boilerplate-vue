<template>
<h1>{{ greet }}</h1>
<p class="subtitle">
    Welcome to <a href="http://electron.atom.io" class="js-external-link">Electron</a> app running on this magnificent <strong> {{ platform }} </strong> machine.
</p>
<p class="subtitle">
    You are in <strong> {{ envName }} </strong> environment.
</p>
<p class="subtitle">
    I am in a <a href="http://vuejs.org" class="js-external-link">Vue.js</a> component.
</p>
</template>

<script>
const os = require('os')

export default {
  data () {
    return {
      greet: 'Hello World!',
      platform: os.platform(),
      envName: process.env.NODE_ENV
    }
  }
}
</script>
