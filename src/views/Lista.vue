<template>
  <div class="Lista">
    <h1>Lista de Clientes</h1>
    <GSheets />
  </div>
</template>

<script>
// @ is an alias to /src
import GSheets from '@/components/GSheets.vue'

export default {
  name: 'lista',
  components: {
    GSheets
  }
}
</script>
