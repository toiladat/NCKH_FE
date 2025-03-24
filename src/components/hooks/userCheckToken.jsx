import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '~/redux/actions/user'

const UserCheckToken = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.userReducer)

  useEffect( () => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser.token)
      if (decodedToken.exp * 1000 <new Date().getTime())
        dispatch(updateUser(null))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default UserCheckToken