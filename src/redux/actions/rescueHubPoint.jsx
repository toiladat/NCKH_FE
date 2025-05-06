export const updateLocationRescueStart = (value) => {
  return {
    type:'UPDATE_LOCATION_RESCUE_START',
    payload: value
  }
}
export const updateLocationRescueEnd = (value) => {
  return {
    type:'UPDATE_LOCATION_RESCUE_END',
    payload: value
  }
}
export const updateDetailRescue = (value) => {
  return {
    type:'UPDATE_DETAILS_RESCUE',
    payload: value
  }
}
export const updateImagesRescue = (value) => {
  return {
    type:'UPDATE_IMAGES_RESCUE',
    payload: value
  }
}
export const deleteImageRescue = (value) => {
  return {
    type:'DELETE_IMAGE_RESCUE',
    payload:value
  }
}
export const resetRescueHubPoint = () => {
  return {
    type:'RESET_RESCUE_HUB_POINT'
  }
}
export const updateRescueHubPoints = (value) => {
  return {
    type:'UPDATE_RESCUE_HUB_POINTS',
    payload: value
  }
}

export const updateRescueHubPoint = (value) => {
  return {
    type:'UPDATE_RESCUE_HUB_POINT',
    payload: value
  }
}

