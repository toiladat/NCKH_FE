import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import SideList from './SideList'
import { useState } from 'react'
import { Home } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AdminCheckToken from '~/components/hooks/adminCheckToken'


const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))


export default function DashBoard() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  AdminCheckToken()
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>

          <Tooltip title = 'Go back to home page'>
            <IconButton sx={{ mr: 1 }} onClick={ () => navigate ('/')}>
              <Home/>
            </IconButton>
          </Tooltip>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow:1 }}>
            DashBoard
          </Typography>

        </Toolbar>
      </AppBar>
      <SideList {...{ open, setOpen }} />
    </Box>
  )
}