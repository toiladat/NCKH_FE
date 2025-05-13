import { Close, FavoriteBorder, StarBorder } from '@mui/icons-material'
import {
  AppBar, Avatar, Box, Container, Dialog, IconButton,
  Rating, Slide, Stack, TextField, Toolbar, Tooltip, Typography
} from '@mui/material'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import './swiper.css'
import { updateNeedHelpPoint } from '~/redux/actions/needHelpPoint'
import { evaluatePoint } from '~/actions/user'
import { useTheme } from '@mui/material/styles'


const Transistion = forwardRef((props, ref) => (
  <Slide direction='up' {...props} ref={ref} />
))

const NeedHelpPoint = () => {
  const { needHelpPoint } = useSelector(state => state.needHelpPointReducer)
  console.log(needHelpPoint)
  const { currentUser } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [rating, setRating] = useState(needHelpPoint?.rating)
  const [place, setPlace] = useState()
  const [selectedImage, setSelectedImage] = useState(needHelpPoint?.images?.[0] || '')
  const handleChange = (newValue, id) => {
    if (!newValue) return
    const data = {
      type: 'needHelpPoint',
      pointId: id,
      ratedById: currentUser.id,
      ratePoint: newValue
    }
    evaluatePoint(currentUser, data, dispatch)
    setRating(newValue)
  }

  const handleClose = () => {
    dispatch(updateNeedHelpPoint(null))
  }

  useEffect(() => {
    if (needHelpPoint) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${needHelpPoint.lng},${needHelpPoint.lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      fetch(url).then(res => res.json()).then(data => setPlace(data.features[0]))
    }
  }, [needHelpPoint])

  return (
    <Dialog
      fullScreen
      open={Boolean(needHelpPoint)}
      onClose={handleClose}
      TransitionComponent={Transistion}
    >
      <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main, boxShadow: 3 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              ml: 2,
              flex: 1,
              fontWeight: 600,
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: 1
            }}
          >
            Chi tiết điểm cứu trợ
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close sx={{ fontSize: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ pt: 10 }}>
        {/* Box ngoài bọc ảnh và content */}
        <Box sx={{ display: 'flex', width: '100%', gap: '50px' }}>
          {/* Box ảnh */}
          <Box sx={{ position: 'relative', mb: 4, flex: 1 }}>
            {/* Box ảnh - hiển thị ảnh hàng loạt */}
            <Box sx={{ position: 'relative', mb: 4, flex: 1 }}>
              {/* Ảnh lớn đầu tiên */}
              <Box sx={{
                overflow: 'hidden',
                borderRadius: 2,
                mb: 2
              }}>
                <img
                  src={selectedImage || needHelpPoint?.images?.[0]} // Nếu không có selectedImage, lấy ảnh đầu tiên trong mảng
                  alt="Ảnh chính"
                  style={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover',
                    boxShadow: '8px 8px 25px rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px'
                  }}
                />
              </Box>

              {/* Ảnh con (thumbnail) */}
              <Box sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                paddingBottom: '8px'
              }}>
                {needHelpPoint?.images?.slice(1).map((url, idx) => (
                  <Box key={idx} sx={{ flexShrink: 0 }}>
                    <img
                      src={url}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{
                        width: '100px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        border: selectedImage === url ? '2px solid #1976d2' : 'none'
                      }}
                      onClick={() => setSelectedImage(url)}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Box content */}
          <Box sx={{ flex: 1, border: '0.1px solid #ddd', padding: '20px', boxShadow: '8px 8px 25px rgba(0, 0, 0, 0.3)', borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: '30px' }}>
              <Avatar
                src= {needHelpPoint?.userInfor?.photoURL}
                alt={needHelpPoint?.userInfor?.title}
                sx={{ width: 40, height: 40 }}
              />

              <Typography
                variant="subtitle2"
                fontWeight={600}
                fontSize="16px"
                noWrap
                display="flex"
                alignItems="center"
                gap={0.5}
                color="text.primary"
              >
                {needHelpPoint?.userInfor?.name || 'Người đăng ẩn danh'}
                {needHelpPoint?.userInfor?.name && needHelpPoint?.userInfor?.level !== 1 && (
                  <Box
                    component="span"
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: 'green',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ml: 0.5
                    }}
                  >
                    ✓
                  </Box>
                )}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'gray',
                  fontStyle: 'italic',
                  fontSize: '0.875rem',
                  textAlign: 'right',
                  mt: 1.3
                }}
              >
                {needHelpPoint?.createdAt ? new Date(needHelpPoint.createdAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Ngày không xác định'}
              </Typography>

            </Box>
            <Stack >


              <Stack>
                <Box>
                  <Box sx={{ display:'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={600} fontSize="16px" gutterBottom>Mô tả</Typography>
                    <Stack direction="row" justifyContent="space-between" flexWrap="wrap" sx={{ mb: '20px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {currentUser && (
                          <>
                            <Typography variant="h6" component="span" mr={1}></Typography>
                            <Rating
                              name="needHelpPoint-rating"
                              value={rating ?? needHelpPoint?.rating ?? 5}
                              precision={0.5}
                              emptyIcon={<StarBorder/>}
                              onChange={(event, newValue) => handleChange(newValue, needHelpPoint._id)}
                            />
                          </>
                        )}
                      </Box>
                    </Stack>
                  </Box>
                  <TextField
                    value={needHelpPoint?.description || 'Không có mô tả.'}
                    multiline
                    fullWidth
                    minRows={4}
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ mt: '20px' }}>
                  <Typography variant="h6" fontWeight={600} fontSize="16px" component="span">Thông tin liên hệ: </Typography>
                  <Typography component="span">{place?.text}</Typography>
                </Box>
                <Box sx={{ mt: '20px', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight={600} fontSize="16px" component="span" mr={1}>
                    Lượt quan tâm:
                  </Typography>
                  <Tooltip title="Lượt quan tâm">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FavoriteBorder sx={{ color: theme.palette.primary.main, marginRight: '5px' }} />
                      <Typography component="span">{needHelpPoint?.ratingCount?.length}</Typography>
                    </Box>
                  </Tooltip>
                </Box>

                <Box sx={{ mt: '20px' }}>
                  <Typography variant="h6" fontWeight={600} fontSize="16px" component="span">Địa chỉ:  </Typography>
                  <Typography component="span">{place?.place_name}</Typography>
                </Box>
              </Stack>


              {needHelpPoint?.validByUsers?.length > 0 && (
                <Box sx={{ mt: '20px' }}>
                  <Typography variant="h6" fontWeight={600} fontSize="16px">Được xác minh bởi:</Typography>
                  {needHelpPoint.validByUsers.map((user, idx) => (
                    <Typography key={idx}>{`${user.name} - ${user.userType}`}</Typography>
                  ))}
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Dialog>
  )
}

export default NeedHelpPoint