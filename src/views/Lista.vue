<template>
  <div class="Lista">
    <h1>Lista de Clientes</h1>
    <GSheets :clientes="clientes" :loading="loading" />
  </div>
</template>

<script>
// @ is an alias to /src
import GSheets from '@/components/GSheets.vue'

export default {
  name: 'lista',
  props: {
    clientes: { type: Array },
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    GSheets
  }
}
</script>
