import fetchData from './utils/fetchData'

const url= import.meta.env.VITE_APP_SERVER_URL + '/room'
export const createRoom = async ( room, currentUser, dispatch, setPage ) => {
  dispatch({ type:'START_LOADING' })

  const result = await fetchData({ url, body: room, token: currentUser?.token }, dispatch)
  if (result) {
    dispatch({
      type:'UPDATE_ALERT',
      payload:{
        open:true,
        severity:'success',
        message:'The room has been added successfully'
      }
    })
    dispatch({ type: 'RESET_ROOM' })
    // Chuyển sang tổng quan
    setPage(0)
    // Mở luôn Popup new room
    dispatch({ type: 'UPDATE_ROOM', payload: result })
  }
  dispatch({ type:'END_LOADING' })
}

export const getRooms = async ( dispatch) => {
  const result = await fetchData({ url, method:'GET' }, dispatch )

  if (result) {
    dispatch({ type:'UPDATE_ROOMS', payload: result })
  }
}