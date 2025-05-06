import { createContext, useContext, useEffect, useRef } from 'react'
import { updateUser } from '~/redux/actions/user'
import { updateAdmin } from '~/redux/actions/admin'
import { useDispatch } from 'react-redux'

const Context = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useValue = () => {
  return useContext(Context)
}

const ContextProvider = ({ children }) => {
  const mapRef = useRef()
  const containerRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    // Kiểm tra user đang đăng nhập (user hoặc admin)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const adminUser = JSON.parse(localStorage.getItem('admin'))

    if (currentUser) {
      dispatch(updateUser(currentUser))
    }
    if (adminUser) {
      dispatch(updateAdmin(adminUser))
    }
  }, [])

  return (
    <Context.Provider value={{ dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider
