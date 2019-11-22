<template>
  <div>
    <p>Google Sheets API Quickstart</p>
    <button id="authorize_button" style="display: none;">Authorize</button>
    <button id="signout_button" style="display: none;">Sign Out</button>
    <pre id="content" style="white-space: pre-wrap;"></pre>
    <div v-if="isSignedIn">
      <li v-for="(cliente, index) in massagedClients" v-bind:key=index>
        {{ cliente[0] }}
        {{ cliente[1] }}
        {{ cliente[2] }}
        {{ cliente[3] }}
        {{ cliente[4] }}
      </li>
    </div>

    <h1 v-else>Oh no 😢, no estas autorizadx.</h1>
  </div>
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
      clientes: []
    }
  },
  created () {
    this.login()
  },
  computed: {
    isSignedIn () {
      return this.$isSignedIn()
    },
    massagedClients () {
      return this.clientes
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
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
