import { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import reducer from './reducer'

const initialState = {
  currentUser:null,
  openLogin:false,
  loading:false,
  alert: {
    open:false,
    severity:'infor',
    message:''
  },
  profile: {
    open: false,
    file: null,
    photoURL: ''
  },
  images:[],
  details:{
    title:'',
    description:'',
    price:0
  },
  location:{
    lng:0, lat:0
  },
  needHelpPoints:[],
  priceFilter: 50,
  addressFilter: null,
  filteredNeedHelpPoints : [],
  needHelpPoint: null
}
const Context = createContext(initialState)

// eslint-disable-next-line react-refresh/only-export-components
export const useValue = () => {
  return useContext(Context)
}
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const mapRef = useRef()
  //containerRef là nơi "đỡ" giao diện của Geocoder.
  const containerRef= useRef()
  useEffect(() => {
    const currentUser= JSON.parse(localStorage.getItem('currentUser')) // load trang check token
    if (currentUser) {
      dispatch({
        type:'UPDATE_USER',
        payload:currentUser
      })
    }
  }, [])
  return (
    <Context.Provider value={{ ...state, dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
