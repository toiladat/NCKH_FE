export const fetchCloudinary =async ( file, dispatch ) => {
  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', 'ml_default')
  try {
    const result = await fetch(
      'https://api.cloudinary.com/v1_1/dlcgsmq4d/image/upload',
      {
        method: 'POST',
        body: formData
      }
    )
      .then((response) => response.json())

    return result.secure_url
  } catch (error) {
    dispatch({
      type:'UPDATE_ALERT',
      payload:{
        open: true,
        severity: 'error',
        message: error.message
      }
    })
    console.log(error);
    return null
  }

}