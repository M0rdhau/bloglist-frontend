const userReducer = (state= '', action) => {
  switch (action.type){
    case 'NEW_USER':
      return `bearer ${action.newToken}`
    case 'RESET_USER':
      return ''
    default:
      return state
  }
}

export const logIn = (authToken) => {
  return {
    action: 'NEW_USER',
    newToken: authToken
  }
}

export const logOut = () => {
  return {
    action: 'RESET_USER'
  }
}

export default userReducer
