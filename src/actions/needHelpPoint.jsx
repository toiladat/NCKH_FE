import fetchData from './utils/fetchData'

const url= import.meta.env.VITE_APP_SERVER_URL + '/need-help'
export const createNeedHelp = async ( infoNeedHelp, currentUser, dispatch, setPage ) => {
  dispatch({ type:'START_LOADING' })

  const result = await fetchData({ url, body: infoNeedHelp, token: currentUser?.token }, dispatch)
  if (result) {
    dispatch({
      type:'UPDATE_ALERT',
      payload:{
        open:true,
        severity:'success',
        message:'The Need Help area has been added successfully'
      }
    })
    dispatch({ type: 'RESET_NEED_HELP_POINT' })
    // Chuyển sang tổng quan
    setPage(0)
    // Mở luôn Popup new needHelpPoint
    dispatch({ type: 'UPDATE_NEED_HELP_POINT', payload: result })
  }
  dispatch({ type:'END_LOADING' })
}

export const getNeedHelpPoints = async ( dispatch) => {
  const result = await fetchData({ url, method:'GET' }, dispatch )

  if (result) {
    dispatch({ type:'UPDATE_NEED_HELP_POINTS', payload: result })
  }
}