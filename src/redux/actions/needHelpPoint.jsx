export const updateImage = (value) => {
  return {
    type:'UPDATE_IMAGES',
    images: value
  }
}
export const deleteImage = (value) => {
  return {
    type:'DELETE_IMAGE',
    payload: value
  }
}
export const updateDetail = (value) => {
  return {
    type:'UPDATE_DETAILS',
    payload: value
  }
}
export const updateLocation = (value) => {
  return {
    type:'UPDATE_LOCATION',
    payload: value
  }
}
export const resetNeedHelpPoint = () => {
  return {
    type:'RESET_NEED_HELP_POINT'
  }
}
export const updateNeedHelpPoints = (value) => {
  return {
    type:'UPDATE_NEED_HELP_POINTS',
    payload: value
  }
}
export const filterAddress = (value) => {
  return {
    type:'FILTER_ADDRESS',
    payload: value
  }
}
export const clearAddress = () => {
  return {
    type:'CLEAR_ADDRESS'
  }
}
export const updateNeedHelpPoint = (value) => {
  return {
    type:'UPDATE_NEED_HELP_POINT',
    payload: value
  }
}

