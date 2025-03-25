export const updateAdmin = (value) => {
  return {
    type:'UPDATE_ADMIN',
    payload:value
  }
}
export const getAdmins= (value) => {
  return {
    type:'GET_ADMINS',
    payload:value
  }
}
export const getUsers = (value) => {
  return {
    type:'GET_USERS',
    payload:value
  }
}

export const getNeedHelpPoints = (value) => {
  return {
    type:'GET_NEED_HELP_POINTS',
    payload:value
  }
}

export const getRescueHubPoints = (value) => {
  return {
    type:'GET_RESCUE_HUB_POINTS',
    payload:value
  }
}
