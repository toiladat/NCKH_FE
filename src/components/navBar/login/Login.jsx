import { Close, Send } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Container } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PasswordField from './PasswordField'
import GoogleOneTabLogin from './GoogleOneTabLogin'
import { UserLogin, UserRegister } from '~/actions/user'
import { closeLogin, updateAlert } from '~/redux/actions/util'

const Login = () => {

  const { openLogin } = useSelector(state => state.utilReducer)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('Login')
  const [isRegister, setIsRegister] = useState(false)
  //useRef nên khi Rerender k bị update
  // Dùng get data gửi BE
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const handleClose = () => {
    dispatch(closeLogin())
  }

  const handleSubmit = (e ) => {
    e.preventDefault()
    // handle form
    const email = emailRef.current.value
    const password = passwordRef.current.value
    if (!isRegister) return UserLogin({ email, password }, dispatch)

    // send login request if it is not register and return
    const name = nameRef.current.value
    const confirmPassword = confirmPasswordRef.current.value

    if (password !== confirmPassword ) {
      return dispatch(updateAlert({
        open: true,
        severity:'error',
        message:'Mật khẩu không phù hợp'
      }))
    }
    //send register request
    UserRegister({ name, email, password }, dispatch)
  }

  useEffect( () => {
    isRegister ? setTitle('Đăng ký') : setTitle('Đăng nhập')
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
        <DialogContent dividers
          sx={{
          }}
        >
          {isRegister &&
            <TextField
              autoFocus
              margin='normal'
              variant='standard'
              id='name'
              label='Họ và tên'
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
            <PasswordField passwordRef={confirmPasswordRef} id='confirmPassword' label='Xác nhận mật khẩu'/>
          }
        </DialogContent>

        <DialogActions sx={{ px:'19px' }}>
          <Button type='submit'variant='contained' endIcon={<Send/>}>
            Đăng ký
          </Button>
        </DialogActions>
      </form>

      <DialogActions
        sx={{
          justifyContent:'left',
          p:'5px 24px'
        }}
      >
        <Box 
          sx={{
            alignItems:'center',
            justifyContent:'center'

          }}>
          {isRegister ? 'Đăng nhập tại đây' : 'Đăng ký tại đây'}
          <Button size='small' onClick={ () => setIsRegister(!isRegister)}>
            {isRegister ? 'Đăng nhập' : 'Đăng ký'}
          </Button>
        </Box>

      </DialogActions>

      <DialogActions sx={{
        justifyContent:'center',
        py:'24', //padding top - button
      }}>
        <GoogleOneTabLogin/>
      </DialogActions>
    </Dialog>
  )
}

export default Login