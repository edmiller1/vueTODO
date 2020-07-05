<template>
  <v-dialog v-model="editDialog" width="500" persistent>
    <template v-slot:activator="{ on }">
      <div class="mt-1 icon">
        <v-btn text v-on="on">
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-card-title>Edit Todo</v-card-title>
      <v-text-field label="Todo" v-model="editedText" style="width: 400px" class="pl-5" autofocus></v-text-field>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn style="color: #fff; background: gray" @click="editDialog = false">Cancel</v-btn>
        <v-btn
          style="color: #fff; background: #eb3e33;"
          @click="onSaveChanges"
          @keyup.enter="onSaveChanges"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["todo"],
  data() {
    return {
      editDialog: false,
      editedText: this.todo.text
    };
  },
  methods: {
    onSaveChanges() {
      if (this.editedText.trim() === "") {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("editImportant", {
        id: this.todo.id,
        text: this.editedText
      });
      this.$store.dispatch("loadImportant");
    }
  }
};
</script>

<style scoped>
</style>