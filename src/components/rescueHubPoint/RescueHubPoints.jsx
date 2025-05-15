import { StarBorder } from '@mui/icons-material'
import {
  Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar,
  Rating, Pagination,
  Box,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRescueHubPoints } from '~/actions/rescueHubPoint'
import { evaluatePoint } from '~/actions/user'
import { updateRescueHubPoint } from '~/redux/actions/rescueHubPoint'

const RescueHubPoints = ({ filterType = 'all' }) => {
  const dispatch = useDispatch()
  const { filteredRescueHubPoints: points } = useSelector( (state) => state.rescueHubPointReducer )
  const { currentUser } = useSelector((state) => state.userReducer)


  const [localRatings, setLocalRatings] = useState({})
  const [page, setPage] = useState(1)
  const itemsPerPage = 9 // 9 items for 3 items per row

  useEffect(() => {
    getRescueHubPoints(dispatch, filterType)
  }, [dispatch, filterType])


  const dataNeedHelpPoit = () => {
    let result = [...points] || []
    if (filterType === 'highlight') {
      // Lọc điểm nổi bật: level khác 1 và có ít nhất 5 lượt đánh giá
      result = result.filter(point => point?.userInfor?.level !== 1 && point?.ratingCount > 5)
    } else if (filterType === 'newest') {
      // Lọc điểm mới nhất: Sắp xếp theo ngày tạo (mới nhất lên trên)
      result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    // Trả về tất cả điểm nếu không có bộ lọc
    return result
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const filteredData = dataNeedHelpPoit()
  const startIndex = (page - 1) * itemsPerPage
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <Container>
      <ImageList
        variant="woven" cols={3} gap={30}
        sx={{
          mb: 8,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {currentData && currentData.length > 0 ? (
          currentData.map((point) => (
            <Card key={point._id} sx={{ border: '1px solid #ddd', borderRadius: '10px' }}>
              <ImageListItem sx={{ height: 'auto', borderRadius: '8px', boxShadow: 2 }}>
                <Box sx={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  <img
                    src={point.images[0]}
                    alt={point.title}
                    loading="lazy"
                    style={{
                      cursor: 'pointer',
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                    onClick={() => dispatch(updateRescueHubPoint(point))}
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      borderRadius: '8px 8px 0 0',
                      padding: '10px',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      zIndex: 1
                    }}

                    position="top"
                  />
                </Box>

                <Box sx={{ padding: '10px', backgroundColor: '#fff', borderRadius: '0 0 8px 8px' }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Avatar
                      src={point?.userInfor?.photoURL}
                      alt={point?.userInfor?.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      noWrap
                      display="flex"
                      alignItems="center"
                      gap={0.5}
                      color="text.primary"
                    >
                      {point?.userInfor?.name || 'Người đăng ẩn danh'}
                      {point?.userInfor?.name && point?.userInfor?.level !== 1 && (
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

                  <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mt={2}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      fontSize="15px"
                      sx={{
                        flex: 1,
                        pr: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'text.secondary'
                      }}
                    >
                      {point.description || 'Chưa có tiêu đề'}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                      fontSize="15px"
                      sx={{ flexShrink: 0 }}
                    >
                      Ngày kết thúc: {point.end_time ? new Date(point.end_time).toLocaleDateString('vi-VN') : 'Không rõ'}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary" sx={{ p: 0 }} gutterBottom noWrap>
                      Số lượt quan tâm: {point.validByUsers.length || 0}
                    </Typography>
                    <Rating
                      name="needHelpPoint-rating"
                      value={point?.rating ?? 5}
                      precision={0.5}
                      readOnly
                      emptyIcon={<StarBorder fontSize="inherit" />}
                      sx={{ fontSize: '20px' }}
                    />
                  </Box>
                </Box>
              </ImageListItem>

            </Card>
          ))
        ) : (
          <div>Không có điểm cứu trợ nào được tìm thấy</div>
        )}
      </ImageList>

      {filteredData.length > itemsPerPage && (
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ display: 'flex', justifyContent: 'center', mb: 4, mt: 5 }}
        />
      )}
    </Container>
  )
}

export default RescueHubPoints
