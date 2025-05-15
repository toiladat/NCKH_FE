import { Close, FavoriteBorder, StarBorder } from '@mui/icons-material'
import {
  AppBar, Avatar, Box, Container, Dialog, IconButton,
  Rating, Slide, Stack, TextField, Toolbar, Tooltip, Typography, Divider,
  Button
} from '@mui/material'
import { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import './swiper.css'
import { updateRescueHubPoint } from '~/redux/actions/rescueHubPoint'
import { evaluatePoint } from '~/actions/user'
import { useTheme } from '@mui/material/styles'


const Transistion = forwardRef((props, ref) => (
  <Slide direction='up' {...props} ref={ref} />
))

const RescueHubPoint = () => {
  const { rescueHubPoint } = useSelector(state => state.rescueHubPointReducer)
  const { currentUser } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [rating, setRating] = useState(rescueHubPoint?.rating)
  const [place, setPlace] = useState()
  const [selectedImage, setSelectedImage] = useState(rescueHubPoint?.images?.[0] || '')
  const handleChange = (newValue, id) => {
    if (!newValue) return
    const data = {
      type: 'rescuehubPoint',
      pointId: id,
      ratedById: currentUser.id,
      ratePoint: newValue
    }
    evaluatePoint(currentUser, data, dispatch)
    setRating(newValue)
  }

  const handleClose = () => {
    dispatch(updateRescueHubPoint(null))
  }

  useEffect(() => {
    if (rescueHubPoint) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${rescueHubPoint.lng},${rescueHubPoint.lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      fetch(url).then(res => res.json()).then(data => setPlace(data.features[0]))
    }
  }, [rescueHubPoint])

  return (
    <Dialog
      fullScreen
      open={Boolean(rescueHubPoint)}
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
            Chi tiết chương trình cứu trợ
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close sx={{ fontSize: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{
        pt: 10,
        maxHeight: 'calc(100vh - 64px)', // 64px là chiều cao AppBar mặc định
        overflowY: 'auto',
        pb: 10
      }}>
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
                  src={selectedImage || rescueHubPoint?.images?.[0]} // Nếu không có selectedImage, lấy ảnh đầu tiên trong mảng
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
                {rescueHubPoint?.images?.slice(1).map((url, idx) => (
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
                src= {rescueHubPoint?.userInfor?.photoURL}
                alt={rescueHubPoint?.userInfor?.title}
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
                {rescueHubPoint?.userInfor?.name || 'Người đăng ẩn danh'}
                {rescueHubPoint?.userInfor?.name && rescueHubPoint?.userInfor?.level !== 1 && (
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
                {rescueHubPoint?.createdAt
                  ? (() => {
                    const date = new Date(rescueHubPoint.createdAt)
                    const time = date.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                    const day = date.getDate()
                    const month = date.getMonth() + 1
                    const year = date.getFullYear()
                    return (
                      <>
                        <Box sx={{
                          display: 'flex',
                          gap: 5
                        }}>
                          <Box>Lúc {time}</Box>
                          <Box>Ngày {day} tháng {month} năm {year}</Box>
                        </Box>
                      </>
                    )
                  })()
                  : 'Ngày không xác định'}
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
                              value={rating ?? rescueHubPoint?.rating ?? 5}
                              precision={0.5}
                              emptyIcon={<StarBorder/>}
                              onChange={(event, newValue) => handleChange(newValue, rescueHubPoint._id)}
                            />
                          </>
                        )}
                      </Box>
                    </Stack>
                  </Box>
                  <TextField
                    value={rescueHubPoint?.description || 'Không có mô tả.'}
                    multiline
                    fullWidth
                    minRows={4}
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ mt: '20px', display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight={600} fontSize="16px" component="span" mr={1}>
                    Lượt quan tâm:
                  </Typography>
                  <Tooltip title="Lượt quan tâm">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FavoriteBorder sx={{ color: theme.palette.primary.main, marginRight: '5px' }} />
                      <Typography component="span">{rescueHubPoint?.ratingCount?.length || '0'}</Typography>
                    </Box>
                  </Tooltip>
                </Box>

                <Box sx={{ mt: '20px' }}>
                  <Typography variant="h6" fontWeight={600} fontSize="16px" component="span">Thông tin liên hệ: </Typography>
                  <Typography component="span">{rescueHubPoint?.contact}</Typography>
                </Box>
                <Box sx={{ mt: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                  {/* Điểm bắt đầu */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#1976d2', mr: 2 }} />
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '100px' }}>
                        <Typography variant="subtitle1" fontWeight={600}>Điểm bắt đầu</Typography>
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
                          {rescueHubPoint?.start_time
                            ? (() => {
                              const date = new Date(rescueHubPoint.start_time)
                              const time = date.toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                              const day = date.getDate()
                              const month = date.getMonth() + 1
                              const year = date.getFullYear()
                              return (
                                <>
                                  <Box sx={{
                                    display: 'flex',
                                    gap:3
                                  }}>
                                    <Box>{time}</Box>
                                    <Box>Ngày {day} tháng {month} năm {year}</Box>
                                  </Box>
                                </>
                              )
                            })()
                            : 'Ngày không xác định'}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {rescueHubPoint?.location_start?.address || 'Chưa xác định'}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Điểm kết thúc */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#d32f2f', mr: 2 }} />
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '100px' }}>
                        <Typography variant="subtitle1" fontWeight={600}>Điểm kết thúc</Typography>
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
                          {rescueHubPoint?.end_time
                            ? (() => {
                              const date = new Date(rescueHubPoint.end_time)
                              const time = date.toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                              const day = date.getDate()
                              const month = date.getMonth() + 1
                              const year = date.getFullYear()
                              return (
                                <>
                                  <Box sx={{
                                    display: 'flex',
                                    gap:3
                                  }}>
                                    <Box>{time}</Box>
                                    <Box>Ngày {day} tháng {month} năm {year}</Box>
                                  </Box>
                                </>
                              )
                            })()
                            : 'Ngày không xác định'}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {rescueHubPoint?.location_end?.address || 'Chưa xác định'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

              </Stack>

              <Button onClick={() => {
                if (place?.geometry?.coordinates?.[0] && place?.geometry?.coordinates?.[1]) {
                  const latitude = rescueHubPoint.location_start.lat // Vĩ độ
                  const longitude = rescueHubPoint.location_start.lng // Kinh độ
                  const end_latitude = rescueHubPoint.location_end.lat // Vĩ độ
                  const end_longitude = rescueHubPoint.location_end.lng // Kinh độ
                  const mapUrl = `/maps?lat=${latitude}&lng=${longitude}&end_latitude=${end_latitude}&end_longitude=${end_longitude}`
                  window.location.href = mapUrl
                } else {
                  alert('Không có')
                }
              }}
              sx={{
                backgroundColor: theme.customColors.darkBlue,
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: theme.customColors.Primary,
                  color: '#ffffff' // Giữ nguyên màu chữ khi hover
                },
                borderRadius: '10px',
                width: '30%',
                height: '45px',
                mt: 2
              }}
              >
                Xem đường đi
              </Button>
              {rescueHubPoint?.validByUsers?.length > 0 && (
                <Box sx={{ mt: '20px' }}>
                  <Typography variant="h6" fontWeight={600} fontSize="16px">Được xác minh bởi:</Typography>
                  {rescueHubPoint.validByUsers.map((user, idx) => (
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

export default RescueHubPoint
