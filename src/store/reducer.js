export const initialState = {
  user: null
}

export const actionTypes = {
  CHANGE_USER: ' CHANGE_USER'
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_USER:
      return {
        ...state,
        user: action.user
      }

    default:
      return state
  }
}
export default reducer
