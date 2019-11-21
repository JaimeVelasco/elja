<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <GSheets />
  </div>
</template>

<script>
// @ is an alias to /src
import GSheets from '@/components/GSheets.vue'

export default {
  name: 'home',
  components: {
    GSheets
  }
}
</script>
