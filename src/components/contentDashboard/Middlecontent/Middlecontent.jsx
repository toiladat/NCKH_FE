import { Container, Typography, Card, CardContent, CardMedia, Button, Rating, Box, Avatar } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './swiper.css'
import { useTheme } from '@mui/material/styles' // import useTheme
import { useSelector, useDispatch } from 'react-redux'
import { updateNeedHelpPoint } from '~/redux/actions/needHelpPoint'
import { StarBorder } from '@mui/icons-material'

const Middlecontent = () => {
  const { filteredNeedHelpPoints : filterdPoints } = useSelector (state => state.needHelpPointReducer)
  const theme = useTheme()
  const dispatch = useDispatch()

  return (
    <Container sx={{ pb: '50px', position: 'relative', overflow: 'visible' }}>
      <Typography variant='h3' align='center'
        sx={{
          marginTop: 0,
          paddingBottom: '20px',
          fontWeight: '600',
          fontSize: '40px',
          color: theme.customColors.darkBlue
        }}
      >
                Điểm đang cần được cứu trợ
      </Typography>

      <Typography align='center'
        sx={{
          marginTop: 0,
          paddingBottom: '40px',
          fontWeight: '600',
          color: '#5D5D5D'
        }}
      >
                Nhiều khu vực đang đối mặt với thiên tai và khó khăn. Hãy cùng chung tay giúp đỡ những người cần chúng ta ngay lúc này!
      </Typography>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        grabCursor={true}
        loop={true} // lặp vô hạn
        speed={700}
        style={{ paddingBottom: '30px' }}
        className='custom-swiper'
      >
        {filterdPoints.map ((item, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
                height: '100%',
                transition: '0.4s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                },
                display: 'flex',
                flexDirection: 'column'// phần tử được sắp xếp theo chiều doc
                // background: '#E0DFE0',
              }}
            >
              <Box width="100%" height={300} position="relative">
                <CardMedia
                  component="img"
                  image={item?.images?.[0] || 'default-image-url.jpg'}
                  alt={item?.title || 'Default Title'}
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 2,
                    backgroundColor: '#f0f0f0' // để tránh nền trắng xấu nếu ảnh nhỏ
                  }}
                />
              </Box>


              <CardContent sx={{ flexGrow: 1, px: 2, pt: 2, pb: 1 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Avatar
                    src={item?.userInfor?.photoURL}
                    alt={item?.userInfor?.name}
                    sx={{ width: 40, height: 40 }}
                  />

                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    noWrap
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                  >
                    {item?.userInfor?.name || 'Người đăng ẩn danh'}
                    {item?.userInfor?.name && item?.userInfor?.level !== 1 && (
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
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mt="3">
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize="15px"
                    sx={{ flex: 1, pr: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {item.title || 'Chưa có tiêu đề'}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={600}
                    fontSize="15px"
                    sx={{ flexShrink: 0 }}
                  >
                    Địa chỉ: {item.address || 'Địa chỉ không rõ'}
                  </Typography>
                </Box>


                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary" sx={{ p: 0 }} gutterBottom noWrap>
                    Số lượt quan tâm: {item.validByUsers.length || 0}
                  </Typography>
                  <Rating
                    name="needHelpPoint-rating"
                    value={item?.rating ?? 5}
                    precision={0.5}
                    readOnly
                    emptyIcon={<StarBorder fontSize="inherit" />}
                    sx={{ fontSize: '20px' }}
                  />
                </Box>
              </CardContent>

              <Button size='medium' sx={{ m: 2, borderRadius: '10px' }} variant='contained' color='primary'
                onClick={ () => {
                  // console.log('Button clicked!', item)
                  dispatch(updateNeedHelpPoint(item)) }}
              >
                  Xem chi tiết
              </Button>

            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default Middlecontent