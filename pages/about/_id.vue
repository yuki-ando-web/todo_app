<template>
  <section class="card">
   <div class="card-todo">
     <input class="card-title" v-model="editTitle" >
　　  <textarea class="card-content" v-model="editContent"></textarea>
  </div>
<div class="card-button clearfix">
  　<button clsss="editButton" v-on:click="editTodo(detailTodo)">編集完了</button>
    
</div>
  </section>
</template>

<script>
 export default {
  data:  function () {
    return{
      detailTodo : "",
      editTitle : "",
      editContent : "",
    }
  },
  created: function () {
    this.detailTodo = this.$store.state.todos.todos.find(e => String(e.id) === this.$route.params.id) 
    this.editTitle = this.detailTodo.title
    this.editContent = this.detailTodo.content
  },
  methods: {
    editTodo:function () {
      let dId = this.detailTodo.id ;
      if(this.editTitle != '' && this.editContent != ''){
        console.log(this.editTitle)
        console.log(this.editContent)
        console.log(dId)
        this.$store.dispatch('todos/update',{id:dId,title:this.editTitle,content:this.editContent});
        this.editTitle ="";
        this.editContent = ""
        window.location.href = '/itiran'
        }
    }
  }}
  


</script>

<style>
.card {
  width:350px;
  height:110px;
  background-color: rgb(181, 243, 228);
  border-radius:5px;
  box-shadow: 0 2px 5px #ccc; 
}

.card-todo {
  color:rgb(75, 74, 74)
}
.card-title {

}
  th {
    border:1px solid black;
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