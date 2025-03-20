import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material'
import { Pagination, Autoplay } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch } from 'react-redux'
import { updateNeedHelpPoint } from '~/redux/actions/needHelpPoint'


const PopupNeedHelpPoint = ({ popupInfo }) => {
  const { title, description, price, images }= popupInfo
  const dispatch = useDispatch()
  return (
    <Card sx={{ maxWidth:400 }}>
      <ImageListItem sx={{ display:'block' }}>
        <ImageListItemBar
          sx={{
            background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            zIndex:2
          }}
          title={price === 0 ? 'Free Stay': '$'+price }
          position='top'
        />
        <ImageListItemBar
          title={title}
          subtitle={description.substr(0, 30)+'...'}
          sx={{ zIndex:2 }}
        />
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay
          pagination={ { clickable: true }}
          style={{
            '--swiper-pagination-color':'rgba(255,255,255,0.8)',
            '--swiper-pagination-bullet-active-color':'#fff',
            '--swiper-pagination-bullet-active-opacity':0.5
          }}
        >
          {images?.map( url => (
            <SwiperSlide key={url}>
              <Box
                component='img'
                src={url}
                alt='Need Help Point'
                sx={{
                  height:255,
                  display:'block',
                  overflow:'hidden',
                  width:'100%',
                  cursor:'pointer',
                  objectFit:'cover'
                }}
                onClick={ () => dispatch(updateNeedHelpPoint(popupInfo))}
              >

              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageListItem>
    </Card>
  )
}

export default PopupNeedHelpPoint