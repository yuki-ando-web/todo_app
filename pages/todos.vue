<template>
<div> 
    
  <input type="text"  name="title" placeholder="タイトル"   v-model="addtitle">
  <textarea placeholder="内容"  name="content" v-model="addcontent">

  </textarea>

  <button type=button v-on:click="addTodo">新規投稿</button>
<ul>
  <!-- <li v-for="todo in todos" v-bind:key=""> -->

 <div>{{ todos }}</div>
 <!-- <div>{{ this.$store.state.todos.todos.title }}</div> -->

  </li>
</ul>
 <nuxt-Link to="/itiran">一覧ページ</nuxt-Link>
</div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data:  function () {
    return{
    addtitle:'',
    addcontent:'',
    // sutatus:""
    }
  },
  computed: {
    todos()  {
        return this.$store.state.todos.todos  
  }
  },
  methods: {
    addTodo:function(){
      this.$store.commit('todos/add',{title: this.addtitle,content:this.addcontent})
      console.log(this.addtitle)
      console.log(this.addcontent)
      this.addtitle =""
      this.addcontent =""
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