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
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>
