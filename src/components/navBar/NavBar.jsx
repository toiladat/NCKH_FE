import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import Menu from '@mui/icons-material/Menu'
import { Lock } from '@mui/icons-material'
import UserIcons from './login/UserIcons'
import Sidebar from '../sideBar/Sidebar'
import { useState } from 'react'
import Feature1 from './feature1/Feature1'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openLogin } from '~/redux/actions/util'


const NavBar = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.userReducer)

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
                <Menu
                  sx={{
                    '&:hover': {
                      color: 'black'
                    }
                  }}
                />
              </IconButton>
            </Box>

            <Typography
              variant='h6' component={Link} to='/'
              noWrap
              sx={{
                flexGrow: 1,
                display: {
                  sx: 'none',
                  md: 'flex'
                },
                textDecoration: 'none', // Loại bỏ gạch chân mặc định
                color: 'inherit', // Giữ màu chữ mặc định của Typography
                fontSize: '30px',
                fontWeight: '700',
                '&:hover': {
                  textShadow: `
                    0 0 16px rgba(0, 127, 255, 0.8),
                    0 0 24px rgba(0, 127, 255, 1)
                  `,
                  transform: 'scale(1.05)',
                  cursor: 'pointer'// Thay đổi con trỏ thành "pointer" khi hover
                }
              }}
            >
              HelpMap
            </Typography>


            <Box sx={{ display:{ xs:'none', md:'flex', flexGrow:5 }, gap:1 }}>
              <Feature1/>
            </Box>


            {!currentUser ? (
              <Button onClick={ () => dispatch(openLogin())}
                color='inherit'
                startIcon={<Lock/>}
              >
                Đăng nhập
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