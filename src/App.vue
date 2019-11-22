<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center display-2">
        Elja
      </div>
      <v-spacer></v-spacer>
      <v-btn to="/" text >Home</v-btn>
      <v-btn to="/about" text >About</v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  })
}
</script>
