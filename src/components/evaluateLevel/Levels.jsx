import PropTypes from 'prop-types'
import {
  Box,
  Paper,
  Slider,
  Tooltip,
  Typography,
  Grid,
  Button
} from '@mui/material'
import { useEffect, useState } from 'react'
import { GetEvaluateLevel, UpdateEvaluateLevel } from '~/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import GroupIcon from '@mui/icons-material/Group'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { updateAlert } from '~/redux/actions/util'
import moment from 'moment'

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
  const thresholds = [2, 4, 6, 8, 10]
  const color = ['#4caf50', '#ffc107', '#ff9800', '#f44336', '#b71c1c']

  const index = thresholds.findIndex( th => value <= th)

  return index !== -1 ? color[index] : '#90a4ae'
}
const getOverAllLevel = (critera) => {
  const rate = {
    'fatalities':          0.20,
    'injuries':            0.10,
    'housingDamage':       0.10,
    'foodWater':           0.05,
    'medicalSupplies':     0.10,
    'vulnerableGroups':    0.10,
    'accessibility':       0.10,
    'floodDepth':          0.05,
    'landslideRate':       0.05,
    'agriculturalLoss':    0.10,
    'evacuationCapacity':  0.05
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
export default function Level() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(s => s.userReducer)
  const { location } = useSelector(s => s.evaluatedPointReducer)

  const [evaluation, setEvaluation] = useState(null)

  // fetch on mount / location change
  useEffect(() => {
    if (!location.address) return
    if (evaluation?.name === location.address) return

    ;(async () => {
      const result = await GetEvaluateLevel(currentUser, location.address, dispatch)
      setEvaluation(result)
    })()
  }, [location.address, currentUser, dispatch, evaluation?.name])

  // update local state on slider commit
  const handleSliderChange = (newValue, type) => {
    setEvaluation(prev => ({
      ...prev,
      criteria: prev.criteria.map(c =>
        c.type === type ? { ...c, level: newValue } : c
      )
    }))
  }

  // submit updated criteria array to server
  const handleClick = async () => {
    if (!evaluation) {
      dispatch(updateAlert({
        open: true,
        severity: 'error',
        message: 'Chưa đủ thông tin đánh giá'
      }))
      return
    }

    const payload = {
      code: evaluation.code,
      name: evaluation.name,
      criteria: evaluation.criteria
    }

    await UpdateEvaluateLevel(currentUser, payload, dispatch)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h5' textAlign='center' gutterBottom>
        Đánh giá khu vực:
        <strong>
          {evaluation?.name || '...'}
        </strong>
      </Typography>
      <Grid container spacing={1.5} mb={2}>
        <Grid item xs={12}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1
            }}
          >
            <GroupIcon color="primary" sx={{ fontSize: 28 }} />
            <Typography variant="body1">
              <strong>{evaluation?.name || '...'}</strong> được đánh giá lần cuối bởi{' '}
              <strong>
                {evaluation?.updatedBy?.name || '...'} –{' '}
                {evaluation?.updatedBy?.email || '...'}
              </strong>
            </Typography>
            <Box sx={{ ml: 'auto', fontStyle: 'italic' }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 'auto', fontStyle: 'italic' }}
              >
                Vào ngày{' '}
                <strong>
                  {evaluation?.updatedAt
                    ? moment(evaluation.updatedAt).format('DD-MM-YYYY')
                    : '...'}
                </strong>
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 'auto', fontStyle: 'italic' }}
              >
                Xét lại vào ngày{' '}
                <strong>
                  {evaluation?.updatedAt
                    ? moment(evaluation.expiredAt).format('DD-MM-YYYY')
                    : '...'}
                </strong>
              </Typography>
            </Box>
          </Paper>
        </Grid>

      </Grid>

      {/* Info cards */}
      <Grid container spacing={1.5} mb={2}>
        {[
          { label: 'Cần trợ giúp', value: evaluation?.needHelpPoints },
          { label: 'Đang cứu trợ', value: evaluation?.rescueHubPoints },
          { label: 'Điểm thông tin', value: evaluation?.infoPoints ?? 0 }
        ].map((info, i) => (
          <Grid item xs={4} key={i}>
            <Paper elevation={2} sx={{ p: 1.5, textAlign: 'center' }}>
              <Typography variant='subtitle2'>{info.label}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                <GroupIcon sx={{ fontSize: 30, opacity: 0.3, mr: 1 }} />
                <Typography variant='h6'>{info.value ?? '-'}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Sliders + overall */}
      <Grid container spacing={1.5}>
        {/* sliders */}
        <Grid
          item xs={9.5}
        >
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Grid container direction='column' spacing={1.5}>
              {evaluation?.criteria
                .filter(c => currentUser.permissionEvaluation.includes(c.type))
                .map(criterion => (
                  <Grid container item key={criterion.type} alignItems='center'>
                    <Grid item xs={4} sx={{mr: 1}}>
                      <Typography variant="body1" >{criterion.name}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Slider
                        size='small'
                        value={criterion.level ?? 0}
                        onChangeCommitted={(e, v) => handleSliderChange(v, criterion.type)}
                        valueLabelDisplay='auto'
                        slots={{ valueLabel: ValueLabel }}
                        min={0} max={10} step={1}
                        sx={{
                          '& .MuiSlider-thumb, & .MuiSlider-track': {
                            bgcolor: getColor(criterion.level ?? 0)
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </Grid>

        {/* overall level */}
        <Grid item xs={2.5}>
          <Paper elevation={2} sx={{ p: 2, height: '100%', textAlign: 'center' }}>
            <Typography variant='subtitle2'>Mức độ tổng thể</Typography>
            <Box
              sx={{
                width: 36, height: 36,
                bgcolor: evaluation
                  ? getOverAllLevel(evaluation.criteria)
                  : '#4caf50',
                borderRadius: 1,
                mx: 'auto',
                mt: 1
              }}
            />
            {/* legend */}
            <Box mt={2} mb={2} display='flex' flexDirection='column' gap={1}>
              {[
                ['An toàn', '#4caf50'],
                ['Cảnh báo', '#ffc107'],
                ['Nguy hiểm', '#ff9800'],
                ['Khẩn cấp', '#f44336'],
                ['Rất khẩn cấp', '#b71c1c']
              ].map(([label, color], i) => (
                <Box key={i} display='flex' alignItems='center'>
                  <Box sx={{ width: 16, height: 16, bgcolor: color, borderRadius: 0.5, mr: 1 }} />
                  <Typography variant='body2'>{label}</Typography>
                </Box>
              ))}
              <Button

                size='small'
                variant='contained'
                endIcon={<DoneAllIcon />}
                onClick={handleClick}
              >
                Xác nhận
              </Button>
            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  )
}
