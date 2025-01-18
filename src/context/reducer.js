const reducer = (state, action) => {
  switch (action.type) {
  case 'UPDATE_USER':
    localStorage.setItem('currentUser', JSON.stringify(action.payload))
    return {
      ...state,
      currentUser: action.payload // Cập nhật currentUser bằng payload
    }
  case 'OPEN_LOGIN': // mở model login
    return {
      ...state,
      openLogin:true
    }
  case 'CLOSE_LOGIN':// đóng model login
    return {
      ...state,
      openLogin:false
    }
  case 'UPDATE_ALERT':
    return {
      ...state,
      alert: action.payload
    }
  case 'START_LOADING':
    return {
      ...state,
      loading:true
    }
  case 'END_LOADING':
    return {
      ...state,
      loading:false
    }
  case 'UPDATE_PROFILE':
    return {
      ...state,
      profile: action.payload
    }
  case 'UPDATE_IMAGES':
    return {
      ...state,
      images: [...state.images, action.images]
    }
  case 'DELETE_IMAGE':
    return {
      ...state,
      images:state.images.filter( image => image.url!==action.payload)
    }
  default:
    throw new Error('no matched action')
  }
}
export default reducer