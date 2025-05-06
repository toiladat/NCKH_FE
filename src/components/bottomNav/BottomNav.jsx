import { AddLocationAlt, LocationOn } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag'
import MedicationIcon from '@mui/icons-material/Medication'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import React, { useRef, useEffect } from 'react'
import ClusterMap from '../map/ClusterMap'
import NeedHelpPoints from '../needHelpPoint/NeedHelpPoints'
import AddNeedHelp from '../addNeedHelp/AddNeedHelp'
import AddRescueHub from '../addRescueHub/AddRescueHub'
import Protected from '../protected/Protected'
import EvaluateLevel from '../evaluateLevel/EvaluateLevel'
import { useSelector } from 'react-redux'

const BottomNav = () => {
  const [value, setValue] = React.useState(0)
  const { currentUser } = useSelector(state => state.userReducer)
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
        2: <Protected><AddNeedHelp setPage={ setValue}/></Protected>,
        3: <Protected><AddRescueHub/></Protected>,
        4: (
          currentUser?.level === 3
            ? <Protected><EvaluateLevel /></Protected>
            : <Box sx={{ p: 2, textAlign: 'center' }}>Bạn không có quyền đánh giá mức độ thiệt hại.</Box>
        )
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
          {/* 3 icon newValue=  0-1-2-3 set active cho label */}
          <BottomNavigationAction label='Map' icon= { <LocationOn/> } />
          <BottomNavigationAction label='Need Help Points' icon= { <MedicationIcon/> } />
          <BottomNavigationAction label='Add Need Help' icon= { <AddLocationAlt/> } />
          <BottomNavigationAction label='Add rescue Hub' icon= {<FlagIcon/>} />
          <BottomNavigationAction label='Evaluete damaged level' icon ={<DoneAllIcon/>} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNav