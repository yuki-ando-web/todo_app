
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
  //id（詳細）画面で表示させるために用意
  option:[
    {id:0 ,label:'作業前'},
    {id:1 ,label:'作業中'},
    {id:2 ,label:'完了'}
  ]
  //stateの進行状況（status)を変更させるために用意
})

export const mutations = {
  initTodos(state) {
    state.todos = []
  },
  //初期化
  
  addTodos(state, todo) {
    state.todos.push(todo)
  },
  //firestoreをstateに反映

  addTodo(state, todo) {
    state.todo = todo
  },
  //id(詳細)ページで特定のtodoを表示させる

  deleteTodo(state, payload) {
    for (let i = 0; i < state.todos.length; i++) {
      const ob = state.todos[i];
      if (ob.id == payload.id
        ) {
          state.todos.splice(i, 1);
        }
      }
  },
  //stateから任意のtodo削除
  changeStatus: function(state, payload){
    for(let i = 0; i < state.todos.length; i++) {
      const ob = state.todos[i];
      if(ob.id == payload.todo.id ) {
      let nowStatus;
      for(let j = 0; j < state.option.length; j++){
        if(state.option[j].label == ob.status){
          nowStatus = state.option[j].id;
        }
      }
      nowStatus++;
      if(nowStatus >= state.option.length){
        nowStatus = 0;
      }
      payload.todo.status = state.option[nowStatus].label
      return;
    }
  }
}
  //actionからtodoを受けとる,stateのstatusの状態を変更
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
  //initTodosで初期化、作成日付潤に並び替えて,addTodosに渡す(firestoreの値をstateに反映させる)

  fetchTodo({commit},payload) {
    todoRef.where('id', '==', payload.id ).get()
    .then(res => {
      res.forEach((doc) =>{
        commit('addTodo',doc.data())
      })
    })
  },
  //詳細画面から取得したidと一致したtodoを探し,addTodoに渡す(idが一致したtodoのみをstateの値にする)
  addTodo({ commit }, payload) {
    const todo = {
      title: payload.todo.title,
      content: payload.todo.content,
      id: todoRef.doc().id,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
      status:'作業前'
    }
    todoRef.add(todo)
  },
  //todos.vueからtitleとcontentを受け取りtodoを定義してfirestoreに入れる
  
  updateTodo({ commit },payload) {
    todoRef.where('id', '==', payload.editTodo.id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const updateTodo = {
            title: payload.editTodo.title,
            content: payload.editTodo.content,
            id: payload.editTodo.id,
            updated_at: firebase.firestore.FieldValue.serverTimestamp(),
            status:payload.editTodo.status
          }
          todoRef.doc(doc.id).update(updateTodo)
        })
      })
    },
    //id.vueからeditTodoを受け取り,その値をupdateTodoに格納,idが一致するtodoをupdateTodoに更新する
  deleteTodo({ commit }, payload) {
    todoRef.where('id', '==', payload.id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).delete()
        })
      })
    commit('deleteTodo',payload)
  },
  //itiran.vueからidを受け取りstoreでidが一致するtodoを削除,idをcommitにも渡す

    changeStatus({ commit },payload){
      todoRef.where('id', '==', payload.todo.id).where('status', '==', '作業前' ).get().
      then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).update({
            status:'作業中'
          })
        })
      }),
      todoRef.where('id', '==', payload.todo.id).where('status', '==', '作業中' ).get().
      then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).update({
            status:'完了'
          })
        })
        }),
      todoRef.where('id', '==', payload.todo.id).where('status', '==', '完了' ).get().
      then(snapshot => {
        snapshot.forEach(doc => {
          todoRef.doc(doc.id).update({
            status:'作業前'
          })
    }) 
  })
  commit('changeStatus',payload)
},
//itiran.vueからidとstatusを取得,statusが作業前→作業中→完了に変異するようにする
}
