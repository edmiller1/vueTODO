<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-content style="background: #32a2df">
      <router-view></router-view>
    </v-content>
    <footerapp></footerapp>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Footerapp: Footer
  }
};
</script>
