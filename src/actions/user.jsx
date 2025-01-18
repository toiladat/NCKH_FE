import { uploadToCloudinary } from './utils/uploadToCloudinary'
import fetchData from './utils/fetchData'
import extractPublicId from './utils/extractPublicId '
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

export const updateProfile = async ( currentUser, updatedFields, dispatch ) => {
  dispatch({ type: 'START_LOADING' })
  const { name, file } = updatedFields
  let body = { name, id: currentUser.id, photoURL: currentUser.photoURL }

  try {
    if ( file ) {
      // upload to cloudinary
      const photoURL =await uploadToCloudinary(file, dispatch)
      // // delete old photo in cloudinary
      // if (currentUser.photoURL) {
      //   const public_id= extractPublicId(currentUser.photoURL)
      //   await deleteInCloudinary(public_id)
      // }
      body= { ... body, photoURL }
    }
    // send data to BE
    const result = await fetchData({
      url: url + '/updateProfile',
      method:'PATCH',
      body,
      token: currentUser.token
    }
    )

    if (result) {
      dispatch({
        type: 'UPDATE_USER',
        payload:{ ...currentUser, ...result }
      })
      dispatch({
        type:'UPDATE_ALERT',
        payload:{
          open:true,
          severity:'success',
          message: 'Your profile has beend updated successfully'
        }
      })
      dispatch({
        type:'UPDATE_PROFILE',
        payload:{
          open: false,
          file: null,
          photoURL: result.photoURL
        }
      })
    }
  } catch (error) {
    dispatch({
      type:'UPDATE_ALERT',
      payload:{
        open: true,
        severity:'error',
        message: error.message
      }
    })
    console.log(error.message);
  }

  dispatch({ type: 'END_LOADING' })

}