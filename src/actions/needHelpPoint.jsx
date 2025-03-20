import { resetNeedHelpPoint, updateNeedHelpPoint, updateNeedHelpPoints } from '~/redux/actions/needHelpPoint'
import fetchData from './utils/fetchData'
import { endLoading, startLoading, updateAlert } from '~/redux/actions/util'

const url= import.meta.env.VITE_APP_SERVER_URL + '/need-help'
export const createNeedHelp = async ( infoNeedHelp, currentUser, dispatch, setPage ) => {
  dispatch(startLoading())

  const result = await fetchData({ url, body: infoNeedHelp, token: currentUser?.token }, dispatch)
  if (result) {
    dispatch(updateAlert({
      open:true,
      severity:'success',
      message:'The Need Help area has been added successfully'
    }))
    dispatch(resetNeedHelpPoint())
    // Chuyển sang tổng quan
    setPage(0)
    // Mở luôn Popup new needHelpPoint
    dispatch(updateNeedHelpPoint(result))
  }
  dispatch(endLoading())
}

export const getNeedHelpPoints = async ( dispatch) => {
  const result = await fetchData({ url, method:'GET' }, dispatch )

  if (result) {
    dispatch(updateNeedHelpPoints(result))
  }
}