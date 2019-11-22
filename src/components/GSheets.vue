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
          keydown
          id="searchField"
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
  mounted () {
    window.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        document.getElementById('searchField').blur()
      }
    })
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
   .mobile {
      color: #333;
    }

    @media screen and (max-width: 768px) {
      .mobile table.v-table tr {
        max-width: 100%;
        position: relative;
        display: block;
      }

      .mobile table.v-table tr:nth-child(odd) {
        border-left: 6px solid deeppink;
      }

      .mobile table.v-table tr:nth-child(even) {
        border-left: 6px solid cyan;
      }

      .mobile table.v-table tr td {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        height: auto;
        padding: 10px;
      }

      .mobile table.v-table tr td ul li:before {
        content: attr(data-label);
        padding-right: .5em;
        text-align: left;
        display: block;
        color: #999;

      }
      .v-datatable__actions__select
      {
        width: 50%;
        margin: 0px;
        justify-content: flex-start;
      }
      .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
        background: transparent;
      }

    }
    .flex-content {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }

    .flex-item {
      padding: 5px;
      width: 50%;
      height: 40px;
      font-weight: bold;
    }
</style>
