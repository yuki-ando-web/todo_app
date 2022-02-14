
import firebase from '~/plugins/firebase';
import _ from 'lodash';
const db = firebase.firestore();

const todoRef = db.collection('todos')

firebase.firestore().settings({
	ignoreUndefinedProperties: true,
})

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
  initTodos(state) {
    state.todos = []
  },
  addTodos(state, todo) {
    state.todos.push(todo)
  },
  addTodo(state, todo) {
    state.todo = todo
  },

  remove(state, id) {
    var num = 0;
    for (let i = 0; i < state.todos.length; i++) {
      const ob = state.todos[i];
      if (ob.id == id
      ) {
        state.todos.splice(i, 1);
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
  fetchTodos({commit}) {
    commit('initTodos')
      todoRef.orderBy('created_at','desc').get()
      .then(res =>{
        res.forEach((doc) => {
          commit('addTodos',doc.data())
        })
      })
  },
  // fetchTodo({commit},payload) {
  //   console.log(payload)
  //   todoRef.where('id', '==', payload.id ).get()
  //   .then(res => {
  //     res.forEach((doc) =>{
  //       commit('addTodo',doc.data())
  //     })
  //   })
  // },
  addTodo({ commit }, payload) {
    const todo = {
      title: payload.todo.title,
      content: payload.todo.content,
      id: todoRef.doc().id,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
      state:'作業前'
    }
    todoRef.add(todo)
  },
  deleteTodo({ commit }, payload) {
    todoRef.where('id', '==', payload.id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).delete()
        })
      })
  },
  updateTodo(payload) {
    todoRef.where('id', '==', payload.editTodo.id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const updateTodo = {
            title: payload.editTodo.title,
            content: payload.editTodo.content,
            id: payload.editTodo.id,
            updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            state:payload.editTodo.state
          }
          todoRef.doc(doc.id).update(updateTodo)
        })
      })
    },
    changeState({ commit },payload){
      console.log(todoRef.where('state', '==', '作業前' ))
      todoRef.where('id', '==', payload.todo.id).where('state', '==', '作業前' ).get().
      then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).update({
            state:'作業中'
          })
        })
      }),
      todoRef.where('id', '==', payload.todo.id).where('state', '==', '作業中' ).get().
      then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).update({
            state:'完了'
          })
        })
        }),
      todoRef.where('id', '==', payload.todo.id).where('state', '==', '完了' ).get().
      then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).update({
            state:'作業前'
          })
    }) 
  })
},
  initTodos({ commit }) {
    commit('initTodos');
  },

}
