<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span> from {{ appName }} running on {{ platform }} </span>
  </div>
</template>

<script>
  import { remote } from 'electron'
  import os from 'os'

  export default {
    data () {
      return {
        platform: os.platform(),
        appName: remote.app.getName(),
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!'
      }
    }
  }
</script>
