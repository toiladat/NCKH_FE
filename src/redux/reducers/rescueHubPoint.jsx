

const initialState = {
  location_rescue:{
    start:{ lng: 105.8542, lat: 21.0285, address:'' },
    end: { lng: 0, lat:0, address:'' }
  },
  details_rescue: {
    timeStart:null,
    timeEnd:null,
    description:''
  },
  images_rescue:[],
  rescueHubPoints: [],
  addressFilter: null,
  filteredRescueHubPoints :[],
  rescueHubPoint:null
}
const applyFilter = ( rescueHubPoints, address ) => {
  let filteredRescueHubPoints = rescueHubPoints
  if (address) {
    const { lng, lat } = address
    filteredRescueHubPoints = filteredRescueHubPoints.filter( rescueHubPoint => {
      const lngDifference = lng > rescueHubPoint.lng ? lng - rescueHubPoint.lng : rescueHubPoint.lng - lng // luon > 0
      const latDifference = lat > rescueHubPoint.lat ? lat - rescueHubPoint.lat : rescueHubPoint.lat - lat
      return lngDifference <=2 && latDifference<=2 // trả về những points gần nhất với lng và lat truyền vào
    })
  }
  return filteredRescueHubPoints
}

const rescueHubPointReducer = (state = initialState, action ) => {
  switch (action.type) {
  case 'UPDATE_LOCATION_RESCUE_START':
    return {
      ...state,
      location_rescue:{
        ...state.location_rescue,
        start: action.payload
      }
    }
  case 'UPDATE_LOCATION_RESCUE_END':
    return {
      ...state,
      location_rescue:{
        ...state.location_rescue,
        end: action.payload
      }
    }
  case 'UPDATE_DETAILS_RESCUE':
    return {
      ...state,
      details_rescue:{
        ...state.details_rescue,
        ...action.payload
      }
    }
  case 'UPDATE_IMAGES_RESCUE':
    return {
      ...state,
      images_rescue: [...state.images_rescue, action.payload]
    }
  case 'DELETE_IMAGE_RESCUE':
    return {
      ...state,
      images_rescue:state.images_rescue.filter( image => image.url!==action.payload)
    }
  case 'RESET_RESCUE_HUB_POINT':
    return {
      ...state,
      images_rescue:[],
      details_rescue:{ description:'', timeStart: null, timeEnd:null },
      location_rescue:{
        start:{ lng: 0, lat: 0 },
        end: { lng: 0, lat:0 }
      }
    }
  case 'UPDATE_RESCUE_HUB_POINTS':
    return {
      ...state,
      rescueHubPoints: action.payload,
      addressFilter:null,
      filteredRescueHubPoints: action.payload
    }
  case 'FILTER_ADDRESS_RESCUE_HUB':
    return {
      ...state,
      addressFilter: action.payload,
      filteredRescueHubPoints: applyFilter(
        state.rescueHubPoints, action.payload
      )
    }
  case 'UPDATE_RESCUE_HUB_POINT':
    return {
      ...state,
      rescueHubPoint: action.payload
    }
  default:
    return state
  }
}
export default rescueHubPointReducer