const initialState = {
  currentUser:null,
  profile: {
    open: false,
    file: null,
    photoURL: ''
  }

}

const userReducer = (state = initialState, action) => {

  switch (action.type) {

  case 'UPDATE_USER' :
    localStorage.setItem('currentUser', JSON.stringify(action.payload))
    return {
      ...state,
      currentUser: action.payload // Cập nhật currentUser bằng payload
    }
  case 'UPDATE_PROFILE':
    return {
      ...state,
      profile: action.payload
    }
  default:
    return state

  }
}

export default userReducer