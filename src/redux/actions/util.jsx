export const openLogin = () => {
  return {
    type:'OPEN_LOGIN'
  }
}
export const closeLogin = () => {
  return {
    type:'CLOSE_LOGIN'
  }
}
export const updateAlert = (value) => {
  return {
    type:'UPDATE_ALERT',
    payload:value
  }
}
export const startLoading = () => {
  return {
    type:'START_LOADING'
  }
}
export const endLoading = () => {
  return {
    type:'END_LOADING'
  }
}