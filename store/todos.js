
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
  },
  option:[
    {id:0 ,label:'作業前'},
    {id:1 ,label:'作業中'},
    {id:2 ,label:'完了'}
  ]
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
  },
changeState: function(state, todo){
  for(let i = 0; i < state.todos.length; i++) {
    const ob = state.todos[i];
    if(ob.id == todo.id ) {
      let nowState;
      for(let j = 0; j < state.option.length; j++){
        if(state.option[j].label == ob.state){
          nowState = state.option[j].id;
          //最初はlabel作業前のためob.stateは0
        }
      }
      nowState++;
      if(nowState >= state.option.length){
        nowState = 0;
      }
      todo.state = state.option[nowState].label
      return;
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
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
      state:'作業前'
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
