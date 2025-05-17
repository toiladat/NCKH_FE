import { resetNeedHelpPoint, updateNeedHelpPoint, updateNeedHelpPoints } from '~/redux/actions/needHelpPoint'
import fetchData from './utils/fetchData'
import { endLoading, startLoading, updateAlert } from '~/redux/actions/util'

const url= import.meta.env.VITE_APP_SERVER_URL + '/need-help'
export const createNeedHelp = async ( infoNeedHelp, currentUser, dispatch, navigate ) => {
  dispatch(startLoading())

  const result = await fetchData({ url, body: infoNeedHelp, token: currentUser?.token }, dispatch)
  if (result) {
    dispatch(updateAlert({
      open:true,
      severity:'success',
      message:'Tạo điểm cứu trợ thành công!'
    }))
    dispatch(resetNeedHelpPoint())
    // Mở luôn Popup new needHelpPoint
    dispatch(updateNeedHelpPoint(result))
  }
  dispatch(endLoading())
  const mapUrl = `/maps?lat=${infoNeedHelp.lat}&lng=${infoNeedHelp.lng}`
  window.location.href = mapUrl
}

export const getNeedHelpPoints = async ( dispatch) => {
  const result = await fetchData({ url, method:'GET' }, dispatch )

  if (result) {
    dispatch(updateNeedHelpPoints(result))
  }
}