import firebase from '~/plugins/firebase';
import _ from 'lodash';
const db = firebase.firestore();

const todoRef = db.collection('todos')

export const state = () => ({
todos: [],
todo:{
  title:'',
  content:'',
  id:'',
  created_at:'',

}
})

export const mutations = {
  initTodos(state){
    state.toods = [];
    console.log("init")
  },
  // add (state,{title:addtitle,content:addcontent}){
    //   state.todos.push({
      //     title:addtitle,
      //     content:addcontent,
      //     id:state.todos.length
      //   })
      // },
      add(state,todo){
        state.todos.push(todo)
      },
      delete(state){
        console.log('a')
        state.todos.length= 0 
        state.memo.length= 0 
      },
      remove(state,todo){
        console.log(todo)
        var num = 0 ;
        for (let i = 0; i < state.todos.length; i++) {
          const ob = state.todos[i];
          if (ob.title == todo.title
            && ob.content == todo.content){
              alert('remove it! --' + ob.title);
              state.todos.splice(i,1); 
            }  
          } 
        },
        update(state,{id:dId,title:editTitle,content:editContent}){
          console.log(dId)
          console.log(editTitle)
          for (let i = 0; i < state.todos.length; i++) {
            const ob = state.todos[i];
            console.log(ob.id)
            if (ob.id == dId){
              console.log(i)
              state.todos.splice(i,1,{
                title:editTitle,
                content:editContent,
                id: firebase.todoRef.doc().id
              })
            }
          }
        }
      }
      
      export const actions ={
        add({commit},payload){
          const todo = {
            title:payload.todo.title,
            content:payload.todo.content,
            id: todoRef.doc().id,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          }
          todoRef.add(todo)
          commit('add',todo)
          // return new Promise((resolve) =>  {
          //   resoleve();
          // })  
          // .then => 
          // .then(function(){
          //   commit('add',todo)
          // })
          
        },
        initTodos({commit}) {
          commit('initTodos');
        },
        update({commit},{id:dId,title:editTitle,content:editContent})
        {
          console.log("E")
          console.log()
          todoRef.doc().update({
            title:editTitle,
            content:editContent,
          })
        },
      }
      export const getters = {
        orderdTodos: state => {
          console.log("P")
          // const orderdStore = todoRef.orderBy('created_at','desc');
          //orderBy firestore専用
          return  _.sortBy(state.todos,'created_at',);
          // return [orderdStore,orderdState]
        }
      }
      