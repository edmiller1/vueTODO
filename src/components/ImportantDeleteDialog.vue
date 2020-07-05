<template>
  <v-dialog v-model="deleteDialog" width="500" persistent>
    <template v-slot:activator="{ on }">
      <div class="mt-1 icon">
        <v-btn text v-on="on">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-card-title>Are you sure you?</v-card-title>
      <v-divider></v-divider>
      <v-card-text>The todo item will be permanently deleted.</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn style="color: #fff; background: gray" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn
          style="color: #fff; background: #eb3e33;"
          @click="deleteTodo(todo), deleteDialog = false"
          @keyup.enter="deleteTodo(todo), deleteDialog = false"
        >Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
      deleteDialog: false
    };
  },
  methods: {
    deleteTodo(todo) {
      this.$store.dispatch("deleteImportant", todo);
      this.$store.dispatch("loadImportant");
    }
  }
};
</script>

<style scoped>
</style>