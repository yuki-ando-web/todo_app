<template>
<div> 
    
  <input type="text"  name="title" placeholder="タイトル"   v-model="todo.title">
  <textarea placeholder="内容"  name="content" v-model="todo.content">
  </textarea>
  <button type=button v-on:click="addTodo">新規投稿</button>
<ul>
  </li>
</ul>
 <nuxt-Link to="/itiran">一覧ページ</nuxt-Link>
</div>
</template>

<script>
export default {
  data:  function () {
    return{
     todo: {
       title:'',
       content:'',
     }
    }
  },
  computed: {
    todos()  {
        return this.$store.state.todos.todos  
  }
  },
  methods: {
    addTodo:function(){
      this.$store.dispatch('todos/addTodo',{todo: this.todo})
      this.todo.title =""
      this.todo.content =""
    },
  }
}
</script>

<style>
input {
  border: solid 1px;
  background-color: rgb(255, 255, 180)
}
textarea {
  border: solid 1px;
  background-color: rgb(255, 255, 180)
}
</style>