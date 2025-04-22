const initialState = {
  admin: JSON.parse(localStorage.getItem('admin')) || null,
  admins: [],
  users: {
    pageTotal:1,
    userTotal:0,
    currPage:1,
    usersData:[]
  },
  rescueHubPoints: {
    pageTotal:1,
    pointTotal:0,
    currPage:1,
    pointsData:[]
  },
  needHelpPoints: {
    pageTotal:1,
    pointTotal:0,
    currPage:1,
    pointsData:[]
  }
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
      users:{
        ...state.users,
        ...action.payload
      }
    }
  case 'GET_NEED_HELP_POINTS':
    return {
      ...state,
      needHelpPoints:{
        ...state.needHelpPoints,
        ...action.payload
      }
    }
  case 'GET_RESCUE_HUB_POINTS':
    return {
      ...state,
      rescueHubPoints:{
        ...state.rescueHubPoints,
        ...action.payload
      }
    }
  default:
    return state
  }
}

export default adminReducer