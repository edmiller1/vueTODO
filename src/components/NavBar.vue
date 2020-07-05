<template>
  <nav>
    <v-app-bar app elevation="5">
      <router-link to="/" tag="h1" class="logo">
        <v-toolbar-title>
          <span class="font-weight-light">Vue</span>
          <span class="font-weight-bold text-uppercase">todo</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn text color="grey" router to="/important" class="btn">
        Important
        <v-icon class="pb-1" color="#f9a03f">mdi-star-outline</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      color: ""
    };
  },
  methods: {
    changeColor(prop) {
      this.color = prop;
    }
  }
};
</script>

<style scoped>
.logo {
  cursor: pointer;
}

.btn {
  text-decoration: none;
  outline: none;
}
</style>