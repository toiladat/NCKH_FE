export const uploadToCloudinary =async ( file, dispatch ) => {
  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', 'ml_default')
  try {
    const result = await fetch(
      import.meta.env.VITE_API_CLOUDINARY,
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
    // eslint-disable-next-line no-console
    console.log(error)
    return null
  }

}