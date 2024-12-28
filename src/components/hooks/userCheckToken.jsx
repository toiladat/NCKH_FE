import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useValue } from '~/context/ContextProvider'

const UserCheckToken = () => {
  const { currentUser, dispatch } = useValue()
  useEffect( () => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser.token)
      if (decodedToken.exp * 1000 <new Date().getTime())
        dispatch({
          type:'UPDATE_USER',
          payload:null
        })
    }
  }, [])
}

export default UserCheckToken