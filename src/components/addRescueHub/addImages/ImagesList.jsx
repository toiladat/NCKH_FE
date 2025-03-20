import { Cancel } from '@mui/icons-material'
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { deleteOnAppWrite } from '~/actions/utils/fetchToAppWrite'
import { useDispatch, useSelector } from 'react-redux'
import { deleteImageRescue } from '~/redux/actions/rescueHubPoint'
const ImagesList = () => {
  const { images_rescue } = useSelector( state => state.rescueHubPointReducer)
  const dispatch = useDispatch()

  const handleDelete =async ( image ) => {
    dispatch(deleteImageRescue(image.url))
    await deleteOnAppWrite(image.uploadedFile)
  }
  return (
    <ImageList
      sx={{ width: '100%', height:400 }} cols={3} rowHeight={350}
    >
      {images_rescue?.map( (image, index) => (
        <ImageListItem key={ index }>
          <img src={ image.url } alt='Image' loading='lazy' style={{ width:'100%', height: '100%', objectFit:'cover' }}/>
          <ImageListItemBar
            position='top'
            sx={{
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%)'
            }}

            actionIcon={
              <IconButton
                sx={{ color:'white' }}
                onClick={ () => handleDelete(image) }
              >
                <Cancel/>
              </IconButton>
            }
          >

          </ImageListItemBar>
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default ImagesList