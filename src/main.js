import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueGAPI from 'vue-gapi'
import vuetify from './plugins/vuetify'

const apiConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  clientId: process.env.VUE_APP_CLIENT_ID,
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets'
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
}

Vue.config.productionTip = false

Vue.use(VueGAPI, apiConfig)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
