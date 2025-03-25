const initialState = {
  admin: JSON.parse(localStorage.getItem('admin')) || null,
  admins: [],
  users: [],
  rescueHubPoints: [],
  needHelpPoints: []
};

const adminReducer = (state = initialState, action) => {

  switch (action.type) {

  case 'UPDATE_ADMIN' :
    localStorage.setItem('admin', JSON.stringify(action.payload))
    return {
      ...state,
      admin: action.payload
    }
  case 'GET_ADMINS':
    return {
      ...state,
      admins: action.payload
    }
  case 'GET_USERS':
    return {
      ...state,
      users:action.payload
    }
  case 'GET_NEED_HELP_POINTS':
    return {
      ...state,
      needHelpPoints:action.payload
    }
  case 'GET_RESCUE_HUB_POINTS':
    return {
      ...state,
      rescueHubPoints:action.payload
    }
  default:
    return state
  }
}

export default adminReducer