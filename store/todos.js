
import firebase from '~/plugins/firebase';
import _ from 'lodash';
const db = firebase.firestore();

const todoRef = db.collection('todos')

export const state = () => ({
  todos: [],
  todo: {
    title: '',
    content: '',
    id: '',
    created_at: '',
    updated_at: '',
  }
})

export const mutations = {
  
  add(state, todo) {
    state.todos.push(todo)
  },

  remove(state, id) {
    var num = 0;
    for (let i = 0; i < state.todos.length; i++) {
      const ob = state.todos[i];
      if (ob.id == id
      ) {
        alert('remove it! --' + ob.title);
        state.todos.splice(i, 1);
      }
    }
  },
  update(state, payload) {
    console.log(payload)
    for (let i = 0; i < state.todos.length; i++) {
      const ob = state.todos[i];
      if (ob.id == payload.editTodo.id) {
        state.todos.splice(i, 1, {
          title: payload.editTodo.title,
          content: payload.editTodo.content,
          id: payload.editTodo.id,
          created_at: payload.editTodo.created_at
        })
      }
    }
  }
}

export const actions = {
  add({ commit }, payload) {
    const todo = {
      title: payload.todo.title,
      content: payload.todo.content,
      id: todoRef.doc().id,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    }
    todoRef.add(todo)
    commit('add', todo)
  },
  remove({ commit }, payload) {
    todoRef.where('id', '==', payload.id).get()
      //vueから渡したidとfirestoreのidが等しい時
      .then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).delete()
        })
      })
    commit('remove', payload.id)
  },
  update({ commit }, payload) {
    todoRef.where('id', '==', payload.editTodo.id).get()
      //vueから渡したidとfirestoreのidが等しい時
      .then(snapshot => {
        snapshot.forEach(doc => {
          const updateTodo = {
            title: payload.editTodo.title,
            content: payload.editTodo.content,
            id: payload.editTodo.id,
            created_at: payload.editTodo.created_at,
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
          }
          todoRef.doc(doc.id).update(updateTodo)
        })
      })
    commit('update', payload)

  },
  initTodos({ commit }) {
    commit('initTodos');
  },

}
export const getters = {
  orderdTodos: state => {
    console.log("P")
    return _.sortBy(state.todos, 'created_at',);
  }
}
