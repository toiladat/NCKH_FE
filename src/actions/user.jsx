import fetchData from './utils/fetchData'

const url = import.meta.env.VITE_APP_SERVER_URL + '/user'

export const register = async (user, dispatch ) => {
  dispatch({ type:'START_LOADING' })
  //SEND RQ WITH FETCH
  const result = await fetchData({ url :url+'/register', body: user }, dispatch)
  if (result) {
    dispatch({
      type:'UPDATE_USER',
      payload: result
    })
    dispatch({ type:'CLOSE_LOGIN' })
    dispatch({
      type:'UPDATE_ALERT',
      payload: {
        open: true,
        severity:'success',
        message: 'Your account has been created successfullly '
      }
    })
  }
  dispatch({ type: 'END_LOADING' })
}

export const login = async (user, dispatch) => {
  dispatch({ type: 'START_LOADING' })
  const result = await fetchData({ url:url+'/login', body: user }, dispatch)
  if (result) {
    dispatch({
      type:'UPDATE_USER',
      payload:result
    })
    dispatch({ type:'CLOSE_LOGIN' })
    dispatch({
      type:'UPDATE_ALERT',
      payload:{
        open:true,
        severity:'success',
        message:'Login successfully'
      }
    })
  }
  dispatch({ type:'END_LOADING' })
}