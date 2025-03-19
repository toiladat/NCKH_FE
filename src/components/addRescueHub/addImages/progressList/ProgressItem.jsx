import { Box, CircularProgress, ImageListItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadToAppWrite } from '~/actions/utils/fetchToAppWrite'
import { updateImagesRescue } from '~/redux/actions/rescueHubPoint'
import { updateAlert } from '~/redux/actions/util'

const ProgressItem = ({ file }) => {

  const [progress, setProgress] = useState(false)
  const [imageURL, setImageURL] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const uploadImage = async () => {
      try {
        setProgress(true)
        const result = await uploadToAppWrite(file)
        dispatch(updateImagesRescue(result))
        setImageURL(null)
        setProgress(false)
      } catch (error) {
        dispatch(updateAlert({
          open: true,
          severity:'error',
          message:error.message
        }))
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