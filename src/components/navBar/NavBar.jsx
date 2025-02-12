import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import Menu from '@mui/icons-material/Menu'
import { Lock } from '@mui/icons-material'
import { useValue } from '~/context/ContextProvider'
import UserIcons from './login/UserIcons'
import Sidebar from '../sideBar/Sidebar'
import { useState } from 'react'

const NavBar = () => {
  const {
    currentUser,
    dispatch
  } = useValue()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <AppBar>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Box sx={{ mr:1 }}>
              <IconButton
                size='large'
                color='inherit'
                onClick={ () => setIsOpen(true)}
              >
                <Menu/>
              </IconButton>
            </Box>
            <Typography
              variant='h6' component='h1' noWrap
              sx={{
                flexGrow:1,
                display:{
                  sx:'none',
                  md:'flex'
                }
              }}
            >
              You Are Welcome
            </Typography>
            {!currentUser ? (
              <Button onClick={ () => dispatch({ type:'OPEN_LOGIN' })}
                color='inherit'
                startIcon={<Lock/>}
              >
                Login
              </Button>
            ) : (
              <UserIcons/>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* Appbar co position : fixed, nó sẽ luôn hiển thị ở trên cùng của trang web, ngay cả khi cuộn trang. */}
      {/* không thêm <Toolbar /> sau AppBar, nội dung của trang sẽ bị đẩy lên phía trên và bị AppBar che mất. */}
      <Toolbar/>
      <Sidebar {...{ isOpen, setIsOpen }}/>
    </>

  )
}

export default NavBar