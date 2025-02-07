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
  case 'UPDATE_DETAILS':
    return {
      ...state,
      details:{
        ...state.details,
        ...action.payload
      }
    }
  case 'UPDATE_LOCATION':
    return {
      ...state,
      location: action.payload
    }
  case 'RESET_NEED_HELP_POINT':
    return {
      ...state,
      images:[],
      details:{ title: '', description:'', price:0 },
      location: { lng: 0, lat: 0 }
    }
  case 'UPDATE_NEED_HELP_POINTS':
    return {
      ...state,
      needHelpPoints: action.payload,
      addressFilter:null,
      priceFilter:50,
      filteredNeedHelpPoints: action.payload
    }
  case 'FILTER_PRICE':
    return {
      ...state,
      priceFilter:action.payload,
      filteredNeedHelpPoints: applyFilter(
        state.needHelpPoints, state.addressFilter, action.payload
      )
    }
  case 'FILTER_ADDRESS':
    return {
      ...state,
      addressFilter: action.payload,
      filteredNeedHelpPoints: applyFilter(
        state.needHelpPoints, action.payload, state.priceFilter
      )
    }
  case 'CLEAR_ADDRESS':
    return {
      ...state,
      addressFilter:null,
      priceFilter: 50,
      filteredNeedHelpPoints:state.needHelpPoints
    }
  case 'UPDATE_NEED_HELP_POINT':
    return {
      ...state,
      needHelpPoint: action.payload
    }
  default:
    throw new Error('no matched action')
  }
}
export default reducer

const applyFilter = ( needHelpPoints, address, price ) => {
  let filteredNeedHelpPoints = needHelpPoints
  if (address) {
    const { lng, lat } = address
    filteredNeedHelpPoints = filteredNeedHelpPoints.filter( needHelpPoint => {
      const lngDifference = lng > needHelpPoint.lng ? lng - needHelpPoint.lng : needHelpPoint.lng - lng // luon > 0
      const latDifference = lat > needHelpPoint.lat ? lat - needHelpPoint.lat : needHelpPoint.lat - lat
      return lngDifference <=1 && latDifference<=1 // trả về những points gần nhất với lng và lat truyền vào
    })
  }
  if ( price < 50 ) {
    filteredNeedHelpPoints= filteredNeedHelpPoints.filter( needHelpPoint => needHelpPoint.price <= price)
  }
  return filteredNeedHelpPoints
}