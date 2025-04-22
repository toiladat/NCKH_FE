import { endLoading, startLoading, updateAlert } from '~/redux/actions/util'
import fetchData from './utils/fetchData'
import { getAdmins, getNeedHelpPoints, getRescueHubPoints, getUsers, updateAdmin } from '~/redux/actions/admin'

const url= import.meta.env.VITE_APP_SERVER_URL + '/admin'

export const getFullAdmins = async (admin, dispatch, page = 1, limit = 5) => {

  const result = await fetchData({ url :url+`/account/get-admins?page=${page}&limit=${limit}`, method:'GET', token: admin?.token }, dispatch )

  if (result) {
    dispatch(getAdmins(result))
  }
}

export const getFullUsers = async (admin, dispatch, page = 1, limit = 5) => {
  const result = await fetchData({ url :url+`/user/get-users?page=${page}&limit=${limit}`, method:'GET', token: admin?.token }, dispatch )
  result.currPage=page
  if (result) {
    dispatch(getUsers(result))
  }
}

export const getFullNeedHelpPoints = async (admin, dispatch, page = 1, limit = 5) => {
  const result = await fetchData({ url :url+`/need-help-point/get-need-help-points?page=${page}&limit=${limit}`, method:'GET', token: admin?.token}, dispatch )
  result.currPage=page

  if (result) {
    dispatch(getNeedHelpPoints(result))
  }
}
export const getFullRescueHubPoints = async (admin, dispatch, page = 1, limit = 5) => {
  const result = await fetchData({ url :url+`/rescue-hub-point/get-rescue-hub-points?page=${page}&limit=${limit}`, method:'GET', token: admin?.token }, dispatch )
  result.currPage=page
  if (result) {
    dispatch(getRescueHubPoints(result))
  }
}


export const getUserByMonth = async (admin, dispatch, startMonth='', endMonth='') => {
  const queryParams = new URLSearchParams({ startMonth, endMonth }).toString()

  const result = await fetchData({ url :url+`/user/get-user-by-month?${queryParams}`, method:'GET', token: admin?.token }, dispatch )
  if (result) {
    return result
  }
  return []
}

export const getNeedHelpPointsByMonth = async (admin, dispatch, startMonth='', endMonth='') => {
  const queryParams = new URLSearchParams({ startMonth, endMonth }).toString()

  const result = await fetchData({ url :url+`/need-help-point/get-need-help-points-by-month?${queryParams}`, method:'GET', token: admin?.token }, dispatch )
  if (result) {
    return result
  }
  return []
}

export const getRescueHubPointByMonth = async (admin, dispatch, startMonth='', endMonth='') => {
  const queryParams = new URLSearchParams({ startMonth, endMonth }).toString()

  const result = await fetchData({ url :url+`/rescue-hub-point/get-rescue-hub-points-by-month?${queryParams}`, method:'GET', token: admin?.token }, dispatch )
  if (result) {
    return result
  }
  return []
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


