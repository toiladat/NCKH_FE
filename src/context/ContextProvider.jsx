import { createContext, useContext, useEffect, useReducer } from 'react'
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
  }
}
const Context = createContext(initialState)

// eslint-disable-next-line react-refresh/only-export-components
export const useValue = () => {
  return useContext(Context)
}
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
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
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
