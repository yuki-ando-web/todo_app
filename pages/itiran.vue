<template>
<ul>
 <div>
   </div> 
  <li v-for="(todo,index) in todos" v-bind:key="">

  <section class="card">
   <!-- {{tood.id}} -->
   <div class="card-todo">
     <h1 class="card-title">{{todo.title}}</h1>
     <select  v-on-change="chengeCardDesign">
       <option >未着手</option>
       <option>進行中</option>
       <option>完了</option>
     </select>
　　  <p class="card-content">{{todo.content}}</p>
  </div>
<div class="card-button clearfix">
       <router-link :to="`about/${todo.id}`">編集</router-link>
    <button class="deletetButton" v-on:click="deleteTodo(todo)">削除</button>
</div>
  </section>
  </li>
</ul>
</template>

<script>
 export default {
  data:  function () {
    console.log(this.$store.state.todos.todos)
    return{
      status : "未着手"
    //   title:'',
    // content:'',
    // sutatus:""
    }
  },
  computed: {
    todos()  {
        return this.$store.state.todos.todos  
  },
  },
  created: function(){
    console.log(this.status)
  },
  
  methods: {
    deleteTodo(todo){
      this.$store.commit('todos/remove',todo)
      console.log(todo)
    }
      }

 }

</script>

<style>
li {
  list-style: none;
}
.card {
  width:350px;
  height:110px;
  background-color: rgb(181, 243, 228);
  border-radius:5px;
  box-shadow: 0 2px 5px #ccc; 
  margin: 15px 15px;
}

.card-todo {
  color:rgb(75, 74, 74)
}
select {
  float: right;
  background-color:rgb(211, 211, 211);
  border:solid 1px
}
  
  .clearfix::after{
    clear: both;
  }
  .card-button button {
    background-color: rgb(182, 182, 182);
    border-radius: 5;
    margin: 5px;
    float: right;
  }
  .editButton{
    border-radius: 5;
    margin-left: px;
  }
  .deleatButton{
    border-radius: 5;
    ;
  }
</style>