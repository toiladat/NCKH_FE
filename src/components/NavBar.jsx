import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import Menu from '@mui/icons-material/Menu'
import { Lock } from '@mui/icons-material'
import { useValue } from '~/context/ContextProvider'
import UserIcons from './user/UserIcons'


const user = {
  name :'dat',
  photoURL:''
}

const NavBar = () => {
  const {
    currentUser,
    dispatch
  } = useValue()
  return (
    <AppBar>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box sx={{ mr:1 }}>
            <IconButton size='large' color='inherit'>
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
            <Button onClick={ () => dispatch({ type:'UPDATE_USER', payload: user })}
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
  )
}

export default NavBar