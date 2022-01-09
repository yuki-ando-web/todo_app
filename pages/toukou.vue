<template>
<div> 
  <label　for="todo"></label>
  <input type="text" placeholder="タイトル"   v-model="addTitle">
  <textarea placeholder="内容"   v-model="addContent">

  </textarea>

  <button type=button v-on:click="addTodo">新規投稿</button>

 <div>{{todos}}</div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data:  function () {
    return{
    addTitle:'',
    // sutatus:""
    }
  },
  computed: {
    todos()  {
        return this.$store.state.todos.todos  
  }
  },
  methods: {
    addTodo(e){
      this.$store.commit('todos/add',this.addTitle)
      console.log(this.addTitle)
      // this.addContent =""
    },
  }
}
</script>