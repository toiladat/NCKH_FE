import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import { Close, Send } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { UpdateProfile } from '~/actions/user'
import { updateProfile } from '~/redux/actions/user'

const Profile = () => {

  const { currentUser, profile } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const nameRef = useRef()
  const phoneRef = useRef()
  const addressRef = useRef()

  // close dialog
  const handleClose = ( ) => {
    dispatch(updateProfile({
      ...profile,
      open:false
    }))
  }
  //send to backend
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const phone = phoneRef.current.value
    const address = addressRef.current.value
    // pass user name and photo file to new function in user actions
    UpdateProfile( currentUser, { name, file: profile.file, phone, address }, dispatch)

  }
  // change Avatar
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const photoURL = URL.createObjectURL(file)
      dispatch(updateProfile({
        ...profile,
        file,
        photoURL
      }))
    }
  }
  return (
    <Dialog
      open={ profile.open }
      onClose={handleClose}
    >
      <DialogTitle>
        Thông tin người dùng
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

          <TextField
            autoFocus
            margin='normal'
            variant='standard'
            id='name'
            label='Tên/Tổ chức'
            type='text'
            fullWidth
            inputRef={ nameRef }
            inputProps={{ minLength:2 }}
            required
            defaultValue={ currentUser?.name }
          />
          <TextField
            autoFocus
            margin='normal'
            variant='standard'
            id='phone'
            label='Liên hệ'
            type='text'
            fullWidth
            inputRef={ phoneRef }
            inputProps={{ minLength:2 }}
            required
            defaultValue={ currentUser?.phone }
          />
          <TextField
            autoFocus
            margin='normal'
            variant='standard'
            id='address'
            label='Địa chỉ'
            type='text'
            fullWidth
            inputRef={ addressRef }
            inputProps={{ minLength:2 }}
            required
            defaultValue={ currentUser?.address }
          />
          <label htmlFor='profilePhoto'>
            <input
              accept='image/*'
              id='profilePhoto'
              type='file'
              style={{ display:'none' }}
              onChange={ handleChange }
            />
            <Avatar
              src={ profile.photoURL }
              sx={{ width:75, height:75, cursor:'pointer' }}
            />
          </label>
        </DialogContent>

        <DialogActions sx={{ px:'19px' }}>
          <Button type='submit'variant='contained' endIcon={<Send/>}>
            Cập nhật
          </Button>
        </DialogActions>
      </form>

    </Dialog>
  )
}

export default Profile