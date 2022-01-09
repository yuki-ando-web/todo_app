export const state = () => ({
todos: []
})

export const mutations = {
  add (state,{addTitle,addContent}) {
    state.todos.push({
      content:addContent,
      // sutatus:未着手
    })
  }
}