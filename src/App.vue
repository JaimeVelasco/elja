<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center display-1">
        Elja
      </div>
      <v-spacer></v-spacer>
      <v-btn to="/" text >Calendario</v-btn>
      <v-btn to="/lista" text >Lista</v-btn>
    </v-app-bar>

    <v-content>
      <router-view :clientes="clientes" :loading="loading" />
    </v-content>
  </v-app>
</template>

<script>
// If the sheet is private, we'll have to authenticate.
const SPREADSHEET_ID = '1lti3IWGxHMTJLB4hvezerNCeeE5LKfzduqq-X2P_2gg'

export default {
  name: 'App',
  data () {
    return {
      loading: true,
      clientes: []
    }
  },
  created () {
    this.login()
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
