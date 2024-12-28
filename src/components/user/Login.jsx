import { Close, Send } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useValue } from '~/context/ContextProvider'
import PasswordField from './PasswordField'
import GoogleOneTabLogin from './GoogleOneTabLogin'

const Login = () => {
  const {
    openLogin,
    dispatch
  } = useValue()
  const [title, setTitle] = useState('Login')
  const [isRegister, setIsRegister] = useState(false)
  //useRef nên khi Rerender k bị update
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' })
  }
  const handleSubmit = (e ) => {
    e.preventDefault()
    // testing Loading
    dispatch({
      type:'START_LOADING'
    })
    setTimeout(() => {
      dispatch({
        type:'END_LOADING'
      })
    }, 1000)
    // testing Notification
    const password = passwordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value

    if (password !== confirmPassword ) {
      dispatch({
        type : 'UPDATE_ALERT',
        payload: {
          open:true,
          severity:'error',
          message:'Password do not match'
        }
      })
    }
  }

  useEffect( () => {
    isRegister ? setTitle('Register') : setTitle('Login')
  }, [isRegister])
  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
    >
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position:'absolute',
            top:8,
            right:8
          }}
          onClick={handleClose}
        >
          <Close/>
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Plese fill your information in the fields below:
          </DialogContentText>
          {isRegister &&
            <TextField
              autoFocus
              margin='normal'
              variant='standard'
              id='name'
              label='Name'
              type='text'
              fullWidth
              inputRef={ nameRef }
              inputProps={{ minLength:2 }}
              required
            />
          }
          <TextField
            autoFocus={ !isRegister }
            margin='normal'
            variant='standard'
            id='email'
            label='Email'
            type='email'
            fullWidth
            inputRef={ emailRef }
            required
          />
          <PasswordField {...{ passwordRef }}/>
          {isRegister &&
            <PasswordField passwordRef={confirmPasswordRef} id='confirmPassword' label='Confirm Password'/>
          }
        </DialogContent>

        <DialogActions sx={{ px:'19px' }}>
          <Button type='submit'variant='contained' endIcon={<Send/>}>
            Submit
          </Button>
        </DialogActions>
      </form>

      <DialogActions
        sx={{
          justifyContent:'left',
          p:'5px 24px'
        }}
      >
        <Box sx={{alignItems:'center', justifyContent:'center' }}>
          {isRegister ? 'Sign in now' : ' Create one now'}
          <Button size='small' onClick={ () => setIsRegister(!isRegister)}>
            {isRegister ? 'Login' : 'Register'}
          </Button>
        </Box>

      </DialogActions>

      <DialogActions sx={{
        justifyContent:'center',
        py:'24' //padding top - button
      }}>
        <GoogleOneTabLogin/>
      </DialogActions>
    </Dialog>
  )
}

export default Login