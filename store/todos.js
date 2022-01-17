export const state = () => ({
todos: []
})

export const mutations = {
  add (state,{title:addtitle,content:addcontent}){
    state.todos.push({
      title:addtitle,
      content:addcontent,
      id:state.todos.length
      // sutatus:未着手
    })
    console.log(addtitle)
    console.log(addcontent)
    console.log(state.todos)
  },
remove(state,todo){
  console.log(todo)
  var num = 0 ;
  for (let i = 0; i < state.todos.length; i++) {
    const ob = state.todos[i];
    if (ob.title == todo.title
      && ob.content == todo.content){
        alert('remove it! --' + ob.title);
        state.todos.splice(i,1); 
      }  
    } 
  },
  update(state,{id:dId,title:editTitle,content:editContent}){
    console.log(dId)
    console.log(editTitle)
    for (let i = 0; i < state.todos.length; i++) {
      const ob = state.todos[i];
      console.log(ob.id)
      if (ob.id == dId){
        console.log(i)
        state.todos.splice(i,1,{
          title:editTitle,
          content:editContent,
          id:dId
        })
      }

  }
}
}
