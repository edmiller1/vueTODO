<template>
  <div>
    <v-card flat height="45" class="mb-1 todo">
      <v-layout row wrap>
        <div width="50">
          <input
            type="checkbox"
            class="check ml-5 mt-3"
            @change="todo.complete = !todo.complete, editTodoComplete(todo)"
          />
        </div>
        <div class="ml-3">
          <div class="mt-3 text-start">
            <label :class="{strike: todo.complete}">{{ todo.text }}</label>
          </div>
        </div>
        <v-spacer></v-spacer>

        <important-edit-dialog :todo="todo"></important-edit-dialog>
        <important-delete-dialog :todo="todo"></important-delete-dialog>

        <div class="mt-2 icon">
          <v-icon
            @click="todo.important = !todo.important, addToImportant(todo), editTodoImportant(todo)"
            :class="{active: todo.important}"
          >mdi-star-outline</v-icon>
        </div>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import ImportantEditDialog from "../components/ImportantEditDialog.vue";
import ImportantDeleteDialog from "../components/ImportantDeleteDialog.vue";
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  components: {
    ImportantEditDialog,
    ImportantDeleteDialog
  },
  data() {
    return {
      beforeCacheEdit: "",
      editedTodo: null
    };
  },
  methods: {
    deleteImportant(todo) {
      this.$store.dispatch("deleteImportant", todo);
    },
    editTodoComplete(todo) {
      this.$store.dispatch("editImportantComplete", {
        id: this.todo.id,
        complete: todo.complete
      });
    },
    editTodoImportant(todo) {
      this.$store.dispatch("editImportantStar", {
        id: this.todo.id,
        important: todo.important
      });
    }
  }
};
</script>

<style scoped>
.check {
  width: 1.3em;
  height: 1.3em;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
}

.icon {
  margin-right: 25px;
  cursor: pointer;
}

.active {
  color: #f9a03f;
}

.strike {
  text-decoration: line-through;
  color: #b8c2cc;
}
</style>