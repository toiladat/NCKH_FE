import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiDrawer from '@mui/material/Drawer'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { styled, useTheme } from '@mui/material/styles'
import { Avatar, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AddLocationAlt, Dashboard, Logout, Medication, NotificationsActive, PeopleAlt } from '@mui/icons-material'
import { updateAdmin } from '~/redux/actions/admin'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

const drawerWidth = 240
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

const SideList = ({ open, setOpen }) => {
  const { admin } = useSelector(state => state.adminReducer)
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(updateAdmin(null))
    navigate('/admin/login')
  }
  const list = useMemo( () => [
    { title: 'Main', icon:<Dashboard/>, link: '' },
    { title: 'Users', icon:<PeopleAlt/>, link: 'users' },
    { title: 'Need Help Points', icon:<Medication/>, link: 'need-help-points' },
    { title: 'Rescue Hub Points', icon:<AddLocationAlt/>, link: 'rescue-hub-points'},
    { title: 'Regions', icon:<NotificationsActive/>, link: 'regions' },
    { title: 'Add Users', icon:<GroupAddIcon/>, link: 'create-user' }
  ], [admin])

  // Theo dõi route hiện tại để cập nhật `selectedLink`
  const [selectedLink, setSelectedLink] = useState(location.pathname.split('/').pop())
  useEffect(() => {
    setSelectedLink(location.pathname.split('/').pop())
  }, [location.pathname])

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={ () => setOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
                onClick={() => {navigate(item.link)}}
                selected= { selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mx: 'auto ', mt: 3, mb:1 }}>
          <Tooltip title= {admin?.name ||'Admin'} >
            <Avatar
              src={admin?.photoURL}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>

        <Box sx={{ textAlign:'center' }}>
          {open && <Typography>{ admin?.name }</Typography>}
          <Typography variant='body2'> {admin?.role || 'role'}</Typography>
          {open && <Typography variant='body2'>{ admin?.email }</Typography>}
          <Tooltip title ='Logout' sx={{ mt:1 }}>
            <IconButton onClick= {handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet/>
      </Box>
    </>
  )
}

export default SideList