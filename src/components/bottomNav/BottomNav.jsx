import { AddLocationAlt, LocationOn } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import MedicationIcon from '@mui/icons-material/Medication'
import React, { useRef, useEffect } from 'react'
import ContentDashboard from '../contentDashboard/ContentDashboard'
import NeedHelpPoints from '../needHelpPoint/NeedHelpPoints'
import AddNeedHelp from '../addNeedHelp/AddNeedHelp'
import Protected from '../protected/Protected'
import { useTheme } from '@mui/material/styles'


const BottomNav = () => {
  const [value, setValue] = React.useState(0)
  const ref = useRef()
  // lấy màu từ theme
  const theme = useTheme() 
  useEffect( ( ) => {
    ref.current.ownerDocument.body.scrollTop = 0
  }, [value])
  console.log(value)

  return (
    <Box ref= { ref }>
      {/* Object lookup */}

      {{
        0: <ContentDashboard/>,
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

          sx = {{
            backgroundColor: theme.palette.primary.main, 
            color: theme.palette.primary.contrastText, 
          }}
        >
          {/* 3 icon newValue=  0-1-2 set active cho label */}
          <BottomNavigationAction label='Map' icon= { <LocationOn/> } 
              sx={{
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '14px',
                  fontWeight: 'bold',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '24px',
                },
                '&.Mui-selected': {
                  '& .MuiBottomNavigationAction-label': {
                    color: '#15919B',      // Màu label khi active
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#15919B',      // Màu icon khi active
                  }
                }
              }}
          />
          <BottomNavigationAction label='Need Help Points' icon= { <MedicationIcon/> } 
            sx={{
              '& .MuiBottomNavigationAction-label': {
                fontSize: '14px',
                fontWeight: 'bold',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '24px',
              },
              '&.Mui-selected': {
                '& .MuiBottomNavigationAction-label': {
                  color: '#15919B',      // Màu label khi active
                },
                '& .MuiSvgIcon-root': {
                  color: '#15919B',      // Màu icon khi active
                }
              }
            }}
          />
          <BottomNavigationAction label='Add Need Help' icon= { <AddLocationAlt/> } 
            sx={{
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '14px',
                  fontWeight: 'bold',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '24px',
                },
                '&.Mui-selected': {
                  '& .MuiBottomNavigationAction-label': {
                    color: '#15919B',      // Màu label khi active
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#15919B',      // Màu icon khi active
                  }
                }
              }}

          />

        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNav