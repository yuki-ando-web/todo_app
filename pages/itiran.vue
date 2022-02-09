<template>
  <ul>
    <p>{{this.$store.state.todos.todos}}</p>
    <li v-for="(todo, index) in todos" v-bind:key="" v-bind:class="{progress:isProgress}">
      <section class="card" >
        <div class="card-todo" >
          <h1 class="card-title">{{ todo.title }}</h1>
          
          <!-- <select
            v-on:change="chengeStatus(index)"
            v-bind:class="{ doing: isDoing }"
          >
            <option id="status" value="mityakusyu">未着手</option>
            <option id="status" value="sinnkoutyuu">進行中</option>
            <option id="status" value="kannryou">完了</option>
          </select> -->
          <p class="card-content">{{ todo.content }}</p>
        </div>
        <div class="card-button clearfix">
          <router-link :to="`about/${todo.id}`" class="editButton"
            >編集</router-link>
          <button class="deletetButton" v-on:click="deleteTodo(todo.id)">
            削除</button>
        </div>
        <button class="button"
          v-bind:class="{
            'button--yet':todo.state == '作業前',
            'button--progress':todo.state == '作業中',
            'button--done':todo.state == '完了'}"
          @click="changeState(todo)">
    {{ todo.state }}
  </button>
      </section>
    </li>
    <!-- <button v-on:click="a">押す</button> -->
  </ul>
</template>

<script>
export default {
  data() {
    console.log(this.$store.state.todos.todos);
    // console.log(todos)
    return {
      isProgress　: false
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos;
    },
    chengeStatus() {
      console.log(isProgress)
      if(this.todo.status='作業中'){
        isProgress= true
      }
    }
  },

  methods: {
    deleteTodo(id) {
      this.$store.dispatch("todos/remove", { id });
    },
    a() {
      this.$store.commit("todos/delete");
    },
    changeState: function(todo){
      
  this.$store.commit("todos/changeState",todo)
},
    
  },
};
</script>

<style>
li {
  list-style: none;
}
.card {
  width: 350px;
  height: 110px;
  background-color: rgb(181, 243, 228);
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  margin: 15px 15px;
}
.doing {
  background-color: red;
}
.card-todo {
  color: rgb(75, 74, 74);
}
select {
  float: right;
  background-color: rgb(211, 211, 211);
  border: solid 1px;
}
.card-button {
  display: flex;
  justify-content: flex-end;
}
.clearfix::after {
  clear: both;
}
.card-button button {
  border-radius: 5;
  background-color: red;
  margin-right: 5px;
  padding: 1px 3px;
  float: right;
}
.card-button .editButton {
  border-radius: 5;
  background-color: rgb(182, 182, 182);
  color: black;
  padding: 1px 2px;
}
.deleatButton {
  border-radius: 5;
}
.progress {
  background-color:red
}
</style>