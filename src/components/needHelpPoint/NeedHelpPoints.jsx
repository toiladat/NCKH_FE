import { StarBorder } from '@mui/icons-material'
import { Avatar, Card, Container, ImageList, ImageListItem, ImageListItemBar, Rating, Tooltip } from '@mui/material'
import { useValue } from '~/context/ContextProvider'

const NeedHelpPoints = () => {
  const { filteredNeedHelpPoints : filteredPoint, dispatch } = useValue()

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
                  onClick={ () => dispatch({ type:'UPDATE_NEED_HELP_POINT', payload:point })}
                />
                <ImageListItemBar
                  title={point.title}
                  actionIcon={
                    <Rating
                      sx={{ color: 'rgba(255,255,255,0.8)', mr: '5px' }}
                      name="needHelpPoint-rating"
                      defaultValue={3.5} // Dữ liệu thực tế nếu có
                      precision={0.5}
                      emptyIcon={<StarBorder sx={{ color: 'rgba(255,255,255,0.8)' }} />}
                    />
                  }
                />
              </ImageListItem>
            </Card>
          ))
        ) : (
          <div>Have no need help points are found</div>
        )}
      </ImageList>
    </Container>
  )
}

export default NeedHelpPoints
