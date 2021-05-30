

const initialState = {
  photos: [],
  emettre : false,
  receptionner : false
}

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
    case 'APPUI_EMETTRE':
      nextState={
        ...state,
        emettre: !state.emettre
      }
      return nextState || state
    case 'APPUI_RECEPTION':
      nextState={
        ...state,
        receptionner: !state.receptionner
      }
      return nextState || state
    default:
      return state
  }
}

export default togglePhoto
