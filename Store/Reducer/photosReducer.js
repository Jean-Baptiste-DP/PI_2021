

const initialState = { photos: [] }

function togglePhoto (state = initialState, action){
  let nextState
  switch (action.type){
    case 'ADD_PHOTO':
      nextState={
        ...state,
        photos:[...state.photos, action.value]
      }
      return nextState || state
    case 'RESET':
      nextState=initialState
      return nextState || state
    default:
      return state
  }
}

export default togglePhoto
