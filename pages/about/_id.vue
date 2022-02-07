<template>
  <section class="card">
<form v-on:submit.prevent="editTodo">
   <div class="card-todo">
     <input class="card-title" id="title" :value="detailTodo.title">
　　  <input class="card-content" id="content" :value="detailTodo.content">
  </div>
<div class="card-button clearfix">
  　<button clsss="editButton" type="submit">編集完了</button>
</div>
  </form>
  </section>
</template>

  
<script>
 export default {
  data:  function () {
    return{
      detailTodo : {
      title : "",
      content : "", 
      id:"",
      created_at : "", 
      updated_at : "",     
      }
    }
  },
  created: function () {
    this.detailTodo = this.$store.state.todos.todos.find(e => String(e.id) === this.$route.params.id) 
    
  },
  
  
   methods: {
    editTodo:function (e) {
      console.log("e")
      const editTodo = {
        title: e.target.title.value,
        content: e.target.content.value,
        id:this.detailTodo.id,
        created_at: this.detailTodo.created_at
      }
    
        
        this.$store.dispatch('todos/update',{editTodo})
         console.log(editTodo)
          setTimeout(() =>{
            window.location.href = '/itiran'
          },1000)
        
        
        
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
    float: right;
  }
  .deleatButton{
    border-radius: 5;
    ;
  }
</style>