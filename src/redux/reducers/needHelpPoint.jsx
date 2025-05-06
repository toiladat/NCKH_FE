
const initialState = {
  images:[],
  details:{
    title:'',
    description:'',
    price:0
  },
  location:{
    lng:105.8542, lat:21.0285, address:''
  },
  needHelpPoints:[],
  addressFilter: null,
  filteredNeedHelpPoints : [],
  needHelpPoint: null
}
const applyFilter = ( needHelpPoints, address ) => {
  let filteredNeedHelpPoints = needHelpPoints
  if (address) {
    const { lng, lat } = address
    filteredNeedHelpPoints = filteredNeedHelpPoints.filter( needHelpPoint => {
      const lngDifference = lng > needHelpPoint.lng ? lng - needHelpPoint.lng : needHelpPoint.lng - lng // luon > 0
      const latDifference = lat > needHelpPoint.lat ? lat - needHelpPoint.lat : needHelpPoint.lat - lat
      return lngDifference <=2 && latDifference<=2 // trả về những points gần nhất với lng và lat truyền vào
    })
  }

  return filteredNeedHelpPoints
}
const needHelpPointReducer = (state = initialState, action ) => {
  switch (action.type) {
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
      filteredNeedHelpPoints: action.payload
    }
  case 'FILTER_ADDRESS':
    return {
      ...state,
      addressFilter: action.payload,
      filteredNeedHelpPoints: applyFilter(
        state.needHelpPoints, action.payload
      )
    }
  case 'CLEAR_ADDRESS':
    return {
      ...state,
      addressFilter:null,
      filteredNeedHelpPoints:state.needHelpPoints
    }
  case 'UPDATE_NEED_HELP_POINT':
    return {
      ...state,
      needHelpPoint: action.payload
    }
  default:
    return state
  }
}
export default needHelpPointReducer