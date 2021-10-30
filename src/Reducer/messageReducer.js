const initState = {
  msgs: []
}

// 保留 Redux 的做法，直接將 initState 給 Reducer
const messageReducer = (state = initState, action) => { 
  switch (action.type) {
      case 'ADD_Message':
          let newState_ADD = [...state,action.payload]
          return newState_ADD
      case 'DELETE_Message':
          let newState_DELETE = state.filter((item,index)=>{
            return item.id !== action.payload.id
          })
          return newState_DELETE
      default:
          return state
  }
}

export { messageReducer }