<script>
  export default {
    name: "Navbar"
  }
</script>

<template>
  <div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">Vue Webgulp</li>
      <li><a v-link="{name: 'home'}">Home</a></li>
      <li><a v-link="{name: 'about'}">About</a></li>
      <li><a v-link="{name: 'quote'}">Quote</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu">
      
    </ul>
  </div>
</div>
</template>
