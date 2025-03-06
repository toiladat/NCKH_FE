import fetchData from './utils/fetchData'
const url= import.meta.env.VITE_APP_SERVER_URL + '/rescue-hub'

export const createRescueHubPoint = async (inforRescueHub, currentUser, dispatch, setPage) => {
  dispatch({ type:'START_LOADING' })
  const result =await fetchData({ url, body: inforRescueHub, token: currentUser?.token }, dispatch )
  if (result) {
    dispatch({
      type:'UPDATE_ALERT',
      payload:{
        open:true,
        severity:'success',
        message:'The Rescue Hub has been added successfully'
      }
    })
    // dispatch({ type: 'RESET_RESCUE_HUB_POINT' })
    // // Chuyển sang tổng quan
    // setPage(0)
  }
  dispatch({ type:'END_LOADING' })
}
export const getRescueHubPoints = async (dispatch) => {
  const result = await fetchData({ url, method:'GET' }, dispatch)
  if (result) {
    dispatch({ type:'UPDATE_NEED_RESCUE_HUB_POINTS', payload: result })
  }
}