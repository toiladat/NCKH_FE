import { StarBorder } from '@mui/icons-material'
import { Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Rating, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { evaluatePoint } from '~/actions/user'
import { updateRescueHubPoint } from '~/redux/actions/rescueHubPoint'

const RescueHubPoints = () => {
  const { filteredRescueHubPoints : filteredPoint } = useSelector( state => state.rescueHubPointReducer)
  const { currentUser } = useSelector( state => state.userReducer)
  // State lưu rating theo point id
  const [localRatings, setLocalRatings] = useState({})

  const dispatch = useDispatch()
  const handleChange = (newValue, id) => {
    let data ={
      type:'rescueHubPoint',
      pointId:id,
      ratedById: currentUser.id,
      ratePoint: newValue
    }
    evaluatePoint(currentUser, data, dispatch)

    // Update rating local
    setLocalRatings(prev => ({
      ...prev,
      [id]: newValue
    }))
  }
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
          'repeat(auto-fill, minmax(280px, 1fr))!important'
        }}
      >
        {filteredPoint && filteredPoint.length > 0 ? (
          filteredPoint.map((point) => (
            <Card key={point._id}>
              <ImageListItem sx={{ height: '100% !important' }}>
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                  }}
                  title={point.price === 0 ? 'Free Stay ' : '$' + point.price}
                  actionIcon={
                    <Tooltip title={point?.userInfor?.name}>
                      <Avatar src={point?.userInfor?.photoURL} sx={{ mr: '5px' }} />
                    </Tooltip>
                  }
                  position="top"
                />
                <img
                  src={point.images[0]}
                  alt={point.title}
                  loading="lazy"
                  style={{ cursor: 'pointer' }}
                  onClick={ () => dispatch(updateRescueHubPoint(point))}
                />
                <ImageListItemBar
                  title={point.title}
                  actionIcon={
                    ( currentUser &&
                      <Rating
                        sx={{ color: 'rgba(255,255,255,0.8)', mr: '5px' }}
                        name="needHelpPoint-rating"
                        value={localRatings[point._id] ?? point.rating ?? 5} // ưu tiên state trước
                        precision={0.5}
                        emptyIcon={<StarBorder sx={{ color: 'rgba(255,255,255,0.8)' }} />}
                        onChange={ (event, newValue) => handleChange(newValue, point._id)}
                      />
                    )
                  }
                />
              </ImageListItem>
            </Card>
          ))
        ) : (
          <div>Have no rescuehub points are found</div>
        )}
      </ImageList>
    </Container>
  )
}

export default RescueHubPoints
