<template>
  <ul>
<router-link to="/">
  新規投稿ページへ
</router-link>
    <v-col v-for="(todo, index) in this.$store.state.todos.todos" v-bind:key="" >
      <v-card class="card" width=""
  height="">
        <div class="card-todo" > {{ todo.todo }}</div>

        <div class="float-right">  
         <v-btn class="button" 
        v-bind:class="{
            'button--yet':todo.status == '作業前',
            'button--progress':todo.status == '作業中',
            'button--done':todo.status == '完了'}" 
          @click="changeStatus(todo)"
          color="#EEEEEE"
          > 
     {{ todo.status }}
   </v-btn>
        </div>
          <h1 class="card-title">{{ todo.title }}</h1>
          <p class="card-content">{{ todo.content }}</p>
        </div>
        <div class="card-button clearfix">
          <v-btn   @click="$router.push(`about/${todo.id}`)" class="editButton" color="grey"
            >編集</v-btn>
          <v-btn class="deletetButton" v-on:click="deleteTodo(todo.id)" color="red">
            削除</v-btn>
        </div>
      </v-card>
    </v-col>
  </ul>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('todos/fetchTodos')
  },
// stateの値を初期化,firestoreの値をstateに反映
  methods: {
    deleteTodo(id) {
      this.$store.dispatch("todos/deleteTodo", { id })
    },
    changeStatus: function (todo) {
      this.$store.dispatch('todos/changeStatus',{todo})
    },
    // deleteTodoとchangeStatusはfetchTodosを利用すると画面がリロードされるため,stateを変更
}
}
</script>

<style>
 .float-right .button--yet {
   color:red;
 }
 .float-right .button--progress {
   color:rgb(137, 146, 11);
 }
 .float-right .button--done {
   color:green;
 }
</style>
