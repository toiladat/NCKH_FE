import { CheckCircleOutline } from '@mui/icons-material'
import { Box, CircularProgress, ImageListItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useValue } from '~/context/ContextProvider'
import { uploadToAppWrite } from '~/actions/utils/fetchToAppWrite'

const ProgressItem = ({ file }) => {

  const [progress, setProgress] = useState(false)
  const [imageURL, setImageURL] = useState(null)
  const { dispatch } = useValue()

  useEffect(() => {
    const uploadImage = async () => {
      try {
        setProgress(true)
        const result = await uploadToAppWrite(file)
        dispatch({
          type: 'UPDATE_IMAGES',
          images:result
        })
        setImageURL(null)
        setProgress(false)
      } catch (error) {
        dispatch({
          type:'UPDATE_ALERT',
          payload: {
            open: true,
            severity:'error',
            message:error.message
          }
        })
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
    setImageURL(URL.createObjectURL(file))
    uploadImage()
  }, [file, dispatch])

  return (
    imageURL && (
      <ImageListItem >
        <img src={imageURL} alt='Image' loading='lazy' style={{ width:'100%', height: '100%', objectFit:'cover' }} />

        <Box sx={backDrop}>
          {progress && (
            <CircularProgress style={{ color: '#fff', opacity:0.4 }} // Sử dụng mã màu hex hoặc tên màu CSS
            />
          )}
        </Box>
      </ImageListItem>
    )
  )
}

export default ProgressItem

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0, .2)',
  width:'100%',
  height:'100%'
}