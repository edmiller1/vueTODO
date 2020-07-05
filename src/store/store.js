import Vue from "vue";
import Vuex from "vuex";
//import moment from 'moment';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myDay: [],
    important: [],
    loading: false
  },
  getters: {
    getMyDayTodos: state => {
      return state.myDay;
    },
    getImportantTodos: state => {
      return state.important;
    },
    getMyDayTodosCount: state => {
      return state.myDay.length;
    },
    getTodoById: state => id => {
      return state.myDay.find(myDay => myDay.id === id);
    },
    loading(state) {
      return state.loading;
    },
    getDoneMyDayTodos(state) {
      return state.myDay.filter(todo => !todo.done);
    }
  },
  mutations: {
    //MYDAY
    ADDMYDAY(state, payload) {
      state.myDay.push(payload);
    },
    SETLOADEDMYDAYTODOS(state, payload) {
      state.myDay = payload;
    },
    DELETEMYDAYTODO(state, payload) {
      const index = state.myDay.indexOf(payload.id);
      state.myDay.splice(index, 1);
    },
    EDITMYDAYTODO(state, payload) {
      const myDayTodo = state.myDay.find(myDayTodo => {
        return myDayTodo.id === payload.id
      })
      if (payload.text) {
        myDayTodo.text = payload.text;
      }
    },
    EDITMYDAYCOMPLETE(state, payload) {
      const myDayTodo = state.myDay.find(myDayTodo => {
        return myDayTodo.id === payload.id;
      })
      myDayTodo.complete = payload.complete;
    },
    EDITMYDAYIMPORTANT(state, payload) {
      const myDayTodo = state.myDay.find(myDayTodo => {
        return myDayTodo.id === payload.id;
      })
      myDayTodo.important = payload.important;
    },

    //IMPORTANT
    ADDIMPORTANT(state, payload) {
      state.important.push(payload);
    },
    ADDIMPORTANTSTARCLICK(state, payload) {
      state.important.push(payload);
    },
    DELETEIMPORTANT(state, payload) {
      const index = state.important.indexOf(payload.id);
      state.important.splice(index, 1);
    },
    EDITIMPORTANT(state, payload) {
      const importantTodo = state.important.find(importantTodo => {
        return importantTodo.id === payload.id;
      })
      if (payload.text) {
        importantTodo.text = payload.text;
      }
    },
    EDITIMPORTANTCOMPLETE(state, payload) {
      const importantTodo = state.important.find(importantTodo => {
        return importantTodo.id === payload.id;
      })
      importantTodo.complete = payload.complete;
    },
    EDITIMPORTANTSTAR(state, payload) {
      const importantTodo = state.important.find(importantTodo => {
        return importantTodo.id === payload.id;
      })
      importantTodo.important = payload.important;
    },
    SETIMPORTANTTODOS(state, payload) {
      state.important = payload;
    },

    //ALL
    SORTTODOTEXT(state) {
      state.myDay.sort((a, b) => a.text.localeCompare(b.text));
    },
    SORTTODOBOOL(state, prop) {
      state.myDay.sort((a, b) => b[prop] - a[prop]);
    },
    SORTIMPORTANTTEXT(state) {
      state.important.sort((a, b) => a.text.localeCompare(b.text));
    },
    SORTIMPORTANTBOOL(state, prop) {
      state.important.sort((a, b) => b[prop] - a[prop]);
    },
    SETLOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    //MYDAY
    loadMyDay({
      commit
    }) {
      commit('SETLOADING', true);
      firebase.database().ref('myday').once('value')
        .then((data) => {
          const myDayTodos = [];
          const obj = data.val();
          for (let key in obj) {
            myDayTodos.push({
              id: key,
              text: obj[key].text,
              important: obj[key].important,
              complete: obj[key].complete
            })
          }
          commit('SETLOADEDMYDAYTODOS', myDayTodos);
          commit('SETLOADING', false);
        })
        .catch((error) => {
          console.log(error);
          commit('SETLOADING', true);
        })
    },
    createMyDay({
      commit
    }, payload) {
      const myDayTodo = {
        text: payload.text,
        important: false,
        complete: false
      }
      firebase.database().ref('myday').push(myDayTodo)
        .then((data) => {
          const key = data.key;
          commit('ADDMYDAY', {
            ...myDayTodo,
            id: key
          });
        })
        .catch((error) => {
          console.log(error);
        })
    },
    addToImportant({
      commit
    }, payload) {
      const soonToBeImportant = {
        text: payload.text,
        important: payload.important,
        complete: payload.complete
      }
      firebase.database().ref('important').push(soonToBeImportant)
        .then((data) => {
          console.log(data);
          commit('ADDIMPORTANTSTARCLICK', {
              soonToBeImportant
            })
            .catch((error) => {
              console.log(error);
            })
        })
    },
    deleteMyDay({
      commit
    }, payload) {
      firebase.database().ref('myday').child(payload.id).remove()
        .then(() => {
          commit('DELETEMYDAYTODO', payload);
        })
    },
    editMyDay({
      commit
    }, payload) {
      const updateObj = {}
      if (payload.text) {
        updateObj.text = payload.text
      }
      firebase.database().ref('myday').child(payload.id).update(updateObj)
        .then((data) => {
          console.log(data)
          commit('EDITMYDAYTODO', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    editMyDayComplete({
      commit
    }, payload) {
      const updateObj = {}
      if (payload.complete === false) {
        updateObj.complete = false
      } else {
        updateObj.complete = true;
      }
      firebase.database().ref('myday').child(payload.id).update(updateObj)
        .then((data) => {
          console.log(data)
          commit('EDITMYDAYCOMPLETE', payload)
        })
        .catch(error => {
          console.log(error + "THIS IS AN ERROR")
        })
    },
    editMyDayImportant({
      commit
    }, payload) {
      const updateObj = {}
      if (payload.important === false) {
        updateObj.important = false
      } else {
        updateObj.important = true;
      }
      firebase.database().ref('myday').child(payload.id).update(updateObj)
        .then((data) => {
          console.log(data)
          commit('EDITMYDAYIMPORTANT', payload)
        })
        .catch(error => {
          console.log(error + "THIS IS AN ERROR")
        })
    },


    //IMPORTANT
    loadImportant({
      commit
    }) {
      commit('SETLOADING', true);
      firebase.database().ref('important').once('value')
        .then((data) => {
          const importantTodos = [];
          const obj = data.val();
          for (let key in obj) {
            importantTodos.push({
              id: key,
              text: obj[key].text,
              important: obj[key].important,
              complete: obj[key].complete
            })
          }
          commit('SETIMPORTANTTODOS', importantTodos);
          commit("SETLOADING", false);
        })
        .catch((error) => {
          console.log(error);
          commit('SETLOADING', true);
        })
    },
    createImportant({
      commit
    }, payload) {
      const importantTodo = {
        text: payload.text,
        important: true,
        complete: false
      }
      firebase.database().ref('important').push(importantTodo)
        .then((data) => {
          const key = data.key;
          commit('ADDIMPORTANT', {
            ...importantTodo,
            id: key
          });
        })
        .catch((error) => {
          console.log(error);
        })
    },
    deleteImportant({
      commit
    }, payload) {
      firebase.database().ref('important').child(payload.id).remove()
        .then(() => {
          commit('DELETEIMPORTANT', payload);
        })
    },
    editImportant({
      commit
    }, payload) {
      const updateObj = {};
      if (payload.text) {
        updateObj.text = payload.text;
      }
      firebase.database().ref('important').child(payload.id).update(updateObj)
        .then(() => {
          commit('EDITIMPORTANTCOMPLETE', payload);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    editImportantComplete({
      commit
    }, payload) {
      const updateObj = {}
      if (payload.complete === false) {
        updateObj.complete = false
      } else {
        updateObj.complete = true;
      }
      firebase.database().ref('important').child(payload.id).update(updateObj)
        .then((data) => {
          console.log(data)
          commit('EDITIMPORTANTSTAR', payload)
        })
        .catch(error => {
          console.log(error + "THIS IS AN ERROR")
        })
    },
    editImportantStar({
      commit
    }, payload) {
      const updateObj = {}
      if (payload.important === false) {
        updateObj.important = false
      } else {
        updateObj.important = true;
      }
      firebase.database().ref('important').child(payload.id).update(updateObj)
        .then((data) => {
          console.log(data)
          commit('EDITMYDAYIMPORTANT', payload)
        })
        .catch(error => {
          console.log(error + "THIS IS AN ERROR")
        })
    },
    sortText() {
      firebase.database().ref('myday').orderByChild('myday/' + 'text')
    }
  },
  modules: {}
});