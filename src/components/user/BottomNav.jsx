import { AddLocationAlt, LocationOn } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import MedicationIcon from '@mui/icons-material/Medication'
import React, { useRef, useEffect } from 'react'
import ClusterMap from '../map/ClusterMap'
import NeedHelpPoints from '../needHelpPoint/NeedHelpPoints'
import AddNeedHelp from '../addNeedHelp/AddNeedHelp'
import Protected from '../protected/Protected'

const BottomNav = () => {
  const [value, setValue] = React.useState(0)
  const ref = useRef()
  useEffect( ( ) => {
    ref.current.ownerDocument.body.scrollTop = 0
  }, [value])
  return (
    <Box ref= { ref }>
      {/* Object lookup */}
      {{
        0: <ClusterMap/>,
        1: <NeedHelpPoints/>,
        2: <Protected><AddNeedHelp setPage={ setValue}/></Protected>
      }[value]}
      <Paper
        elevation={ 3 }
        sx={{
          position:'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2
        }}
      >
        <BottomNavigation
          showLabels
          value={ value}
          onChange={ (e, newValue) => setValue(newValue) }
        >
          {/* 3 icon newValue=  0-1-2 set active cho label */}
          <BottomNavigationAction label='Map' icon= { <LocationOn/> } />
          <BottomNavigationAction label='Need Help Points' icon= { <MedicationIcon/> } />
          <BottomNavigationAction label='Add Need Help' icon= { <AddLocationAlt/> } />

        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNav