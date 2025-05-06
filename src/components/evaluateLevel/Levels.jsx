import PropTypes from 'prop-types'
import { Box, Paper, Slider, Tooltip, Typography, Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { GetEvaluateLevel, UpdateEvaluateLevel } from '~/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { Group } from '@mui/icons-material'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { updateAlert } from '~/redux/actions/util'

function ValueLabel({ children, value }) {
  return (
    <Tooltip enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  )
}
ValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired
}


const getColor = (value) => {
  const thresholds = [1, 2, 3, 4, 5]
  const color = ['#4caf50', '#ffc107', '#ff9800', '#f44336', '#b71c1c']

  const index = thresholds.findIndex( th => value <= th)
  return index !== -1 ? color[index] : '#90a4ae'
}
const getOverAllLevel = (critera) => {
  const rate = {
    'fatalities': 0.3,
    'injuries': 0.1,
    'housingDamage': 0.1,
    'essentialNeeds': 0.2,
    'vulnerableGroups':0.1,
    'accessibility': 0.2
  }
  const criteriations = critera.map( c => {
    return {
      'level': c.level,
      'type': c.type,
      'rate': rate[`${c.type}`]
    }
  })
  const overAllLevel = criteriations.reduce( (sum, { rate, level }) => ( sum + (level) * rate), 0)

  return getColor(overAllLevel)
}
const Level = () => {
  const [evaluation, setEvaluation] = useState(null)
  const { currentUser } = useSelector(state => state.userReducer)
  const { location } = useSelector(state => state.evaluatedPointReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchLevel = async () => {
      const result = await GetEvaluateLevel(currentUser, location.address, dispatch)
      setEvaluation(result)
    }
    if (location.address && location.address !== evaluation?.name) {
      fetchLevel()
    }
  }, [location.address, currentUser, dispatch, evaluation?.name])

  const handleSliderChange = (newValue, criteriaType) => {
    setEvaluation(prev => ({
      ...prev,
      criteria: prev.criteria.map(c =>
        c.type === criteriaType
          ? { ...c, level: newValue }
          : c
      )
    }))
  }
  const handleClick = () => {
    if ( evaluation ) {
      const data = {
        'code':evaluation.code,
        'name':evaluation.name,
        'criteria':evaluation.criteria
      }
      UpdateEvaluateLevel(currentUser, data, dispatch)
    }
    else {
      dispatch(updateAlert({
        open: true,
        severity: 'error',
        message: 'Chưa đủ thông tin đánh giá'
      }))
    }
  }
  return (
    <Box
      sx={{
        p: 2
      }}
    >
      <Typography variant='h5' textAlign='center' gutterBottom>
        {`Các tiêu chí đánh giá địa phận ${evaluation?.name}`}
      </Typography>

      <Grid container spacing={1.5}>
        {/* Info cards */}
        <Grid item xs={4}>
          <Paper elevation={2} sx={{ p: 1.5, textAlign: 'center' }}>
            <Typography variant='subtitle2'>Cần trợ giúp</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
              <Group sx={{ fontSize: 30, opacity: 0.3, mr: 1 }} />
              <Typography variant='h6'>{ evaluation?.needHelpPoints }</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper elevation={2} sx={{ p: 1.5, textAlign: 'center' }}>
            <Typography variant='subtitle2'>Đang cứu trợ</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
              <Group sx={{ fontSize: 30, opacity: 0.3, mr: 1 }} />
              <Typography variant='h6'>{ evaluation?.rescueHubPoints }</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper elevation={2} sx={{ p: 1.5, textAlign: 'center' }}>
            <Typography variant='subtitle2'>Điểm thông tin</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
              <Group sx={{ fontSize: 30, opacity: 0.3, mr: 1 }} />
              <Typography variant='h6'>4</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Sliders */}
      <Grid container spacing={1.5} sx={{ mt: '2px' }}>

        <Grid item xs={9.5}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Grid container direction='column' spacing={1.5}>
              {evaluation?.criteria
                ?.filter(c => currentUser?.permissionEvaluation.includes(c.type))
                .map(criterion => (
                  <Grid
                    container
                    item
                    key={criterion.type}
                  >
                    {/* Nhãn */}
                    <Grid item xs={4} mr={3}>
                      <Typography variant='body1'>{criterion.name}</Typography>
                    </Grid>
                    {/* Slider */}
                    <Grid item xs={7}>
                      <Slider
                        size='small'
                        value={criterion.level ?? 0}
                        onChangeCommitted={(e, newValue) =>
                          handleSliderChange(newValue, criterion.type)
                        }
                        valueLabelDisplay='auto'
                        slots={{ valueLabel: ValueLabel }}
                        min={0}
                        max={5}
                        step={1}
                        sx={{
                          '& .MuiSlider-thumb': {
                            backgroundColor: getColor(criterion.level ?? 0)
                          },
                          '& .MuiSlider-track': {
                            backgroundColor: getColor(criterion.level ?? 0)
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                ))
              }

            </Grid>
          </Paper>
        </Grid>

        {/* Cột sau: chiếm 5/12 */}
        <Grid item xs={2.5}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', textAlign: 'center' }}>
            <Typography variant='subtitle2' gutterBottom>
              Mức độ
            </Typography>

            {/* Mã màu cố định */}
            <Box
              sx={{
                width: 24,
                height: 24,
                bgcolor: evaluation
                  ? getOverAllLevel(evaluation.criteria)
                  : '#4caf50',
                borderRadius: '4px',
                mx: 'auto'
              }}
            />

            <Box sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <Box sx={{ display:'flex' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: '#4caf50',
                    borderRadius: '4px',
                    mr: 2
                  }}
                />
                <Typography>An toàn </Typography>
              </Box>

              <Box sx={{ display:'flex' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: '#ffc107',
                    borderRadius: '4px',
                    mr: 2
                  }}
                />
                <Typography>Cảnh báo</Typography>
              </Box>

              <Box sx={{ display:'flex' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: '#ff9800',
                    borderRadius: '4px',
                    mr: 2
                  }}
                />
                <Typography>Nguy hiểm</Typography>
              </Box>

              <Box sx={{ display:'flex' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: '#f44336',
                    borderRadius: '4px',
                    mr: 2
                  }}
                />
                <Typography>Khẩn cấp</Typography>
              </Box>

              <Box sx={{ display:'flex' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: '#b71c1c',
                    borderRadius: '4px',
                    mr: 2
                  }}
                />
                <Typography>Rất khẩn cấp</Typography>
              </Box>

            </Box>

          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ textAlign:'center' }}>
          <Button onClick={handleClick} variant="contained" endIcon={<DoneAllIcon />}>
            Xác nhận
          </Button>
        </Grid>
      </Grid>

    </Box>
  )
}

export default Level
