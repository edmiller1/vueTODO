<template>
  <v-menu offset-y transition="slide-y-transition" bottom class="menu">
    <template v-slot:activator="{on: menu}">
      <v-tooltip top>
        <template v-slot:activator="{on: tooltip}">
          <v-btn class="moreOptions" icon v-on="{...tooltip, ...menu}">
            <v-icon color="white">mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <span>Sort by</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item class="menuItem">
        <v-icon style="padding-right: 10px;">mdi-sort-alphabetical</v-icon>
        <v-list-item-title @click="sortText" class="sortText">Alphabetically</v-list-item-title>
      </v-list-item>
      <v-list-item class="menuItem">
        <v-icon style="padding-right: 10px;">mdi-star-outline</v-icon>
        <v-list-item-title class="sortText" @click="sortByBool('important')">Importance</v-list-item-title>
      </v-list-item>
      <v-list-item class="menuItem">
        <v-icon style="padding-right: 10px;">mdi-check-all</v-icon>
        <v-list-item-title class="sortText" @click="sortByBool('complete')">Completed</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  methods: {
    sortText() {
      this.$store.commit("SORTIMPORTANTTEXT");
    },
    sortByBool(prop) {
      this.$store.commit("SORTIMPORTANTBOOL", prop);
    },
    filterDoneTodos() {
      this.$store.getters.getDoneMyDayTodos;
    }
  }
};
</script>

<style scoped>
.sortText {
  font-size: 12px;
}

.menuItem {
  cursor: pointer;
}

.menuItem:hover {
  background-color: #6b6b6b2d;
}

.moreOptions {
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
}
</style>