import { createContext, useContext, useEffect, useRef } from 'react'
import { updateUser } from '~/redux/actions/user'
import { useDispatch } from 'react-redux'

const Context = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useValue = () => {
  return useContext(Context)
}
const ContextProvider = ({ children }) => {
  const mapRef = useRef()
  //containerRef là nơi "đỡ" giao diện của Geocoder.
  const containerRef= useRef()
  const dispatch = useDispatch()
  useEffect(() => {
    const currentUser= JSON.parse(localStorage.getItem('currentUser')) // load trang check token
    if (currentUser) {
      dispatch(updateUser(currentUser))
    }
  }, [])
  return (
    <Context.Provider value={{ dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
