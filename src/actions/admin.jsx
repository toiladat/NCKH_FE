import { endLoading, startLoading, updateAlert } from '~/redux/actions/util'
import fetchData from './utils/fetchData'
import { getAdmins, getNeedHelpPoints, getRescueHubPoints, getUsers, updateAdmin } from '~/redux/actions/admin'

const url= import.meta.env.VITE_APP_SERVER_URL + '/admin'
export const DashBoardMain = async (admin, dispatch) => {

  const result = await fetchData({ url :url+'/dashboard', method:'GET', token: admin?.token }, dispatch )
  if (result) {
    dispatch(getAdmins(result.admins))
    dispatch(getUsers(result.users))
    dispatch(getRescueHubPoints(result.rescuehubpoints))
    dispatch(getNeedHelpPoints(result.needHelpPoints))
  }
}

export const AdminLogin = async (admin, dispatch, navigate) => {
  dispatch(startLoading())

  const result = await fetchData({ url:url+'/auth/login', body: admin }, dispatch)
  if (result) {
    dispatch(updateAdmin(result))
    dispatch(updateAlert({
      open:true,
      severity:'success',
      message:'Login successfully'
    }))
    navigate('/admin/dashboard')
  }
  dispatch(endLoading())

}


