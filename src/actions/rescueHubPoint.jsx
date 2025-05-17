import { resetRescueHubPoint, updateRescueHubPoints } from '~/redux/actions/rescueHubPoint'
import fetchData from './utils/fetchData'
import { endLoading, startLoading, updateAlert } from '~/redux/actions/util'
const url= import.meta.env.VITE_APP_SERVER_URL + '/rescue-hub'

export const createRescueHubPoint = async (inforRescueHub, currentUser, dispatch, navigate) => {
  dispatch(startLoading())
  const result =await fetchData({ url, body: inforRescueHub, token: currentUser?.token }, dispatch )
  if (result) {
    dispatch(updateAlert({
      open:true,
      severity:'success',
      message:'Tạo điểm cứu trợ thành công'
    }))
    dispatch(resetRescueHubPoint())
    // // Chuyển sang tổng quan
    // setPage(0)
  }
  dispatch(endLoading())
  const mapUrl = `/maps?lat=${inforRescueHub.location_start.lat}&lng=${inforRescueHub.location_start.lng}&end_latitude=${inforRescueHub.location_end.lat}&end_longitude=${inforRescueHub.location_end.lng}`
  window.location.href = mapUrl
}
export const getRescueHubPoints = async (dispatch) => {
  const result = await fetchData({ url, method:'GET' }, dispatch)
  if (result) {
    dispatch(updateRescueHubPoints(result))
  }
}