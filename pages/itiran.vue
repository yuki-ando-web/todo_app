<template>
  <ul>
<router-link to="/">
  新規投稿ページへ
</router-link>
    <!-- <p>{{this.$store.state.todos.todos}}</p> -->
    <v-col v-for="(todo, index) in this.$store.state.todos.todos" v-bind:key="" >
      <v-card class="card" width=""
  height="">
        <div class="card-todo" > {{ todo.todo }}</div>

        <div class="float-right">
          <select name="" id="statusButton"
         v-on:change="changeState">
        <option value="作業前">作業前</option>    
        <option value="作業中">作業中</option>    
        <option value="完了">完了</option>    
            </select>    
         <v-btn class="button" 
        v-bind:class="{
            'button--yet':todo.state == '作業前',
            'button--progress':todo.state == '作業中',
            'button--done':todo.state == '完了'}" 
          @click="changeState(todo)"
          color="#EEEEEE"
          > 
     {{ todo.state }}
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
  data() {
    return {
    };
  },
  created(){
    this.$store.dispatch('todos/fetchTodos')
  },

  methods: {
    deleteTodo(id) {
      this.$store.dispatch("todos/deleteTodo", { id })
      .then(() => {
        setTimeout(() =>{
          this.$store.dispatch('todos/fetchTodos')
        },100)
      })
    },
    
    changeState: function (todo) {
      const stodo ={
        id:this.$store.state.todos.todo.id,
        state:this.$store.state.todos.todo.state,
      }
      this.$store.commit("todos/changeState",todo)
      this.$store.dispatch('todos/changeState',{stodo})
        
      // let select = document.getElementById('statusButton')
      // console.log(select.value)
      // console.log(todo)
      // const todo = {
      //   id:this.$store.state.todos.todo.id,
      //   state:this.$store.state.todos.todo.state,
      //   select:select.value,
      // }
      // console.log(e.target.statusButton.value)
      
    },
  },
};
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
