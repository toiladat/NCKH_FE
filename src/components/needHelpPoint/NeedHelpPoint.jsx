import { Close, StarBorder } from '@mui/icons-material'
import { AppBar, Avatar, Box, Container, Dialog, IconButton, Rating, Slide, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import './swiper.css'
import { updateNeedHelpPoint } from '~/redux/actions/needHelpPoint'
import { evaluatePoint } from '~/actions/user'


const Transistion = forwardRef( ( props, ref ) => {
  return (
    <Slide direction='up' {...props} ref={ref}/>
  )
})
const NeedHelpPoint = () => {
  const { needHelpPoint } = useSelector( state => state.needHelpPointReducer)
  const { currentUser } = useSelector (state => state.userReducer)
  const dispatch = useDispatch()

  const [rating, setRating] = useState(needHelpPoint?.rating)

  const handleChange = (newValue, id) => {
    if (! newValue) return

    let data ={
      type:'needHelpPoint',
      pointId:id,
      ratedById: currentUser.id,
      ratePoint: newValue
    }
    evaluatePoint(currentUser, data, dispatch)
    setRating(newValue)
  }
  const handleClose = () => {
    dispatch(updateNeedHelpPoint(null))
  }
  const [place, setPlace] = useState()

  //Lấy address bằng lng và lat
  useEffect( () => {
    if (needHelpPoint) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${needHelpPoint.lng},${needHelpPoint.lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      fetch(url).then( res => res.json()).then(data => setPlace(data.features[0]))
    }
  }, [needHelpPoint])

  return (
    <Dialog
      fullScreen
      open={Boolean(needHelpPoint)}
      onClose={handleClose}
      TransitionComponent={Transistion}
    >
      <AppBar position='relative'>
        <Toolbar>
          <Typography
            variant='h6'
            component='h3'
            sx={{
              ml: 2,
              flex:1
            }}
          >
            {needHelpPoint?.title}
          </Typography>
          <IconButton color='inherit' onClick={handleClose}>
            <Close/>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ pt: 5, textAlign:'center' }}>
        <Swiper
          pagination={{
            dynamicBullets: true
          }}
          modules={[Pagination]}
        >
          {needHelpPoint?.images?.map( url => (
            <SwiperSlide key={url}>
              <div className='Point'>
                <img src={url} alt='Need Help Point'/>
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title= {needHelpPoint?.userInfor?.name || ''}
            sx={{
              position:'absolute',
              bottom:'8px',
              left:'8px',
              zIndex:2
            }}
          >
            <Avatar src={needHelpPoint?.userInfor?.photoURL}/>
          </Tooltip>
        </Swiper>

        <Stack
          sx={{ p:3 }}
          spacing={2}
        >
          <Stack
            direction='row'
            sx={{
              justifyContent:'space-between',
              flexWrap:'wrap'
            }}
          >
            <Box>
              <Typography variant='h6' component='span'>{'Price per night '}</Typography>
              <Typography component='span'>{ needHelpPoint?.price === 0 ? 'Free Stay': '$'+ needHelpPoint?.price}</Typography>
            </Box>

            <Box
              sx={{
                display:'flex',
                alignItems:'center'
              }}
            >
              {currentUser && (
                <>
                  <Typography variant='h6' component='span'>Rating</Typography>
                  <Rating
                    name='needHelpPoint-rating'
                    value={rating?? needHelpPoint?.rating ?? 5}
                    precision={0.5}
                    emptyIcon={<StarBorder />}
                    onChange={ (event, newValue) => handleChange(newValue, needHelpPoint.pointId)}
                  />
                </>
              )}

            </Box>
          </Stack>

          <Stack
            direction='row'
            sx={{
              justifyContent:'space-between',
              flexWrap:'wrap'
            }}
          >
            <Box>
              <Typography variant='h6' component='span'>{'Place Name: '}</Typography>
              <Typography component='span'>{place?.text}</Typography>
            </Box>

            <Box
              sx={{
                display:'flex',
                alignItems:'center'
              }}
            >
              <Typography variant='h6' component='span'>{'Address: '}</Typography>
              <Typography component='span'>{place?.place_name}</Typography>
            </Box>
          </Stack>

          <Stack
            sx={{
              flexWrap:'wrap',
              alignItems:'start'
            }}
          >
            <Typography variant='h6' component='span'>{'Details: '}</Typography>
            <Typography component='span'>{needHelpPoint?.description}</Typography>
          </Stack>

          {
            needHelpPoint?.validByUsers?.length > 0 &&
            (
              <Stack
                sx={{
                  flexWrap:'wrap',
                  alignItems:'start'
                }}
              >
                <Typography variant='h6' component='span'>{'Được xác minh bởi: '}</Typography>
                {
                  needHelpPoint.validByUsers.map( (user, index) => (
                    <Typography key={index} component='span'>{`${user.name} - ${user.userType}`}</Typography>
                  ))
                }
              </Stack>
            )
          }

        </Stack>
      </Container>
    </Dialog>
  )
}

export default NeedHelpPoint