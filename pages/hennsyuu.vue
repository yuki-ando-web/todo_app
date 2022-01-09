<template>
  <section class="card">
   <div class="card-todo">
     <h1 class="card-title">タイトル</h1>
　　  <p class="card-content">内容</p>
  </div>
<div class="card-button clearfix">
  　<button clsss="editButton">編集完了</button>
    
</div>
  </section>
</template>

<script>
 export default {
  data:  function () {
    return{
    addContent:'',
    // sutatus:""
    }
  },}


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