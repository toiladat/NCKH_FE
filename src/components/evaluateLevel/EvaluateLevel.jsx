import Box from '@mui/material/Box'
import Map from './Map'
import Levels from './Levels'

const EvaluateLevel = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        // height: 500,
        mt: 4,
        overflowY: 'auto'
      }}
    >
      <Box sx={{ flex: 1, mt:6
      }}>
        <Map />
      </Box>
      <Box sx={{ flex: 2 }}>
        <Levels />
      </Box>

    </Box>
  )
}
export default EvaluateLevel
