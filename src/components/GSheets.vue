<template>
  <v-container fluid>
    <v-card elevation=9 v-if="isSignedIn">
      <v-card-title>
        Clientes
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Búsqueda por nombre o apellido"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="clientes"
        :search="search"
        :loading="loading"
        loading-text="Cargando info... aguanta un pooquito."
      ></v-data-table>
    </v-card>
    <h1 v-else>Oh no 😢, no estas autorizadx.</h1>
  </v-container>
</template>

<script>
// If the sheet is private, we'll have to authenticate.
const SPREADSHEET_ID = '1lti3IWGxHMTJLB4hvezerNCeeE5LKfzduqq-X2P_2gg'

export default {
  name: 'GSheets',
  props: {
    msg: String
  },
  data () {
    return {
      clientes: [],
      search: '',
      headers: [
        { text: 'Familia', value: '2' },
        { text: 'Nombre Esposo', value: '3' },
        { text: 'Apellidos Esposo', value: '4' },
        { text: 'Nombre Esposa', value: '5' },
        { text: 'Apellidos Esposa', value: '6' }
      ],
      loading: true
    }
  },
  created () {
    this.login()
  },
  computed: {
    isSignedIn () {
      return this.$isSignedIn()
    }
  },
  methods: {
    login () {
      if (this.$isAuthenticated() !== true) {
        this.$login()
      }
      this.$getGapiClient()
        .then(gapi => {
          gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'JAIME!A3:Z640',
            majorDimension: 'ROWS'
          }).then((response) => {
            const result = response.result
            this.clientes = result.values.map(person => {
              return { ...person }
            })
            this.loading = false
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
