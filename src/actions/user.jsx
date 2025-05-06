import { uploadToCloudinary } from './utils/uploadToCloudinary'
import fetchData from './utils/fetchData'
import { updateProfile, updateUser } from '~/redux/actions/user'
import { closeLogin, endLoading, startLoading, updateAlert } from '~/redux/actions/util'
import { updateEvaluatedPoint } from '~/redux/actions/evaluatedPoint'
const url = import.meta.env.VITE_APP_SERVER_URL + '/user'
export const UserRegister = async (user, dispatch ) => {
  dispatch(startLoading())
  //SEND RQ WITH FETCH
  const result = await fetchData({ url :url+'/register', body: user }, dispatch)
  if (result) {
    dispatch(updateUser(result))
    dispatch(closeLogin())
    dispatch(updateAlert({
      open: true,
      severity:'success',
      message: 'Your account has been created successfullly '
    }))
  }
  dispatch(endLoading())
}

export const UserLogin = async (user, dispatch) => {
  dispatch(startLoading())
  const result = await fetchData({ url:url+'/login', body: user }, dispatch)
  if (result) {
    dispatch(updateUser(result))
    dispatch(closeLogin())
    dispatch(updateAlert({
      open:true,
      severity:'success',
      message:'Login successfully'
    }))
  }
  dispatch(endLoading())
}

export const UpdateProfile = async ( currentUser, updatedFields, dispatch ) => {
  dispatch(startLoading())
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
      url: url + '/update-profile',
      method:'PATCH',
      body,
      token: currentUser.token
    }
    )

    if (result) {
      dispatch(updateUser({
        ...currentUser, ...result
      }))

      dispatch(updateAlert({
        open:true,
        severity:'success',
        message: 'Your profile has beend updated successfully'
      }))
      dispatch(updateProfile({
        open: false,
        file: null,
        photoURL: result.photoURL
      }))
    }
  } catch (error) {
    dispatch(updateAlert({
      open: true,
      severity:'error',
      message: error.message
    }))
    // eslint-disable-next-line no-console
    console.log(error.message)
  }

  dispatch(endLoading())

}

export const evaluatePoint = async (currentUser, data, dispatch) => {

  return await fetchData({
    url: url + '/evaluate-infor',
    method:'PATCH',
    body:data,
    token: currentUser.token
  }, dispatch)
}

export const GetEvaluateLevel = async ( currentUser, address, dispatch) => {
  const urlWithQuery = `${url}/evaluate-level?address=${encodeURIComponent(address)}`

  return await fetchData({
    url:urlWithQuery,
    method:'GET',
    token: currentUser.token
  }, dispatch)

}

export const UpdateEvaluateLevel = async (currentUser, data, dispatch) =>{
  dispatch(startLoading())
  const result = await fetchData({ url:url+'/evaluate-level', body: data, method:'PATCH', token: currentUser.token }, dispatch)
  if (result) {
    dispatch(updateAlert({
      open:true,
      severity:'success',
      message:`${result.message}`
    }))
  }
  dispatch(endLoading())
}