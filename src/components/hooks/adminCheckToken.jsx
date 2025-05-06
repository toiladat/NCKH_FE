import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdmin } from '~/redux/actions/admin'

const AdminCheckToken = () => {
  const dispatch = useDispatch()
  const { admin } = useSelector(state => state.adminReducer)

  useEffect( () => {
    if (admin) {
      const decodedToken = jwtDecode(admin.token)
      if (decodedToken.exp * 1000 <new Date().getTime())
        dispatch(updateAdmin(null))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default AdminCheckToken