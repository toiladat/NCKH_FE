import React, { createContext, useContext, useEffect, useReducer } from 'react'
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
  }
}
const Context = createContext(initialState)
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
  },[])
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider
