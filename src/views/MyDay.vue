<template>
  <div height="100%">
    <v-progress-linear indeterminate color="blue darken-4" height="10" v-if="loading"></v-progress-linear>
    <v-container class="container">
      <v-row>
        <h1 class="header white--text ml-5 mt-3">My Day</h1>
      </v-row>
      <v-row ml-5>
        <v-col cols="6">
          <h1 class="font-weight-light date white--text pl-2">{{ today }}</h1>
        </v-col>
        <v-col cols="6" class="dots">
          <sort-by-list></sort-by-list>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="getTodos.length === 0 && loading === false">
      <v-row wrap class="todo-image">
        <v-col cols="3">
          <v-img src="../assets/todo-list.png" class="image"></v-img>
          <h5 class="pt-2 white--text font-weight-light">Add a task to begin!</h5>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="todosContainer" v-else>
      <v-row wrap class="mt-4">
        <v-col cols="12" class="px-5">
          <todo-list v-for="todo in getTodos" :key="todo.id" :todo="todo"></todo-list>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="inputContainer">
      <v-row align="center" class="input-row">
        <v-col cols="10" class="offset-1">
          <input
            type="text"
            class="form-control input"
            placeholder="+     Add task"
            @keyup.enter="addMyDay"
            v-model="newTodo"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row class="ml-2">
        <v-col cols="5">
          <span style="color: white;">{{ getTodos.length }} items left</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TodoList from "../components/TodoList.vue";
import moment from "moment";
import SortByList from "../components/SortByList.vue";
export default {
  data() {
    return {
      today: moment().format("Do, MMMM YYYY"),
      activeColor: "#D15A8C",
      newTodo: ""
    };
  },
  components: {
    TodoList,
    SortByList
  },
  computed: {
    getTodos() {
      return this.$store.getters.getMyDayTodos;
    },
    getTodo(id) {
      return this.$store.getters.getTodoById, id;
    },
    loading() {
      return this.$store.getters.loading;
    },
    todo() {
      return this.$store.getters.loadedTodo;
    }
  },
  methods: {
    addMyDay() {
      if (this.newTodo.trim().length == 0) {
        return;
      } else {
        this.$store.dispatch("createMyDay", {
          text: this.newTodo
        });
      }
      this.newTodo = "";
    }
  },
  created() {
    this.$store.dispatch("loadMyDay");
  }
};
</script>


<style scoped>
.todo-image {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.dots {
  text-align: end;
}

.container {
  margin: 0 100px 0 80px;
}

.header {
  font-size: 28px;
}

.date {
  font-size: 16px;
}

.todosContainer {
  max-height: 380px;
  overflow: auto;
}

.input {
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  color: white;
  outline: none;
}

::placeholder {
  color: white;
}

.moreOptions {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  outline: none;
}

.image {
  height: 225px;
}

@media (max-width: 810px) {
  .dots {
    text-align: center;
  }
}

@media (max-width: 770px) {
  .image {
    height: 180px;
  }
}

@media (max-width: 585px) {
  .input-row {
    width: 500px;
  }
}

@media (max-width: 555px) {
  .image {
    height: 120px;
  }
}

@media (max-width: 547px) {
  .input-row {
    width: 400px;
  }
}

@media (max-width: 455px) {
  .input-row {
    width: 300px;
  }
}

@media (max-width: 410px) {
  .image {
    height: 100px;
  }
}

@media (max-width: 400px) {
  .dots {
    padding-right: 80px;
  }
}

@media (max-width: 365px) {
  .input-row {
    width: 250px;
  }

  .image {
    height: 60px;
  }
}
</style>
