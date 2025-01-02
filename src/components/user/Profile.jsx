import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import { Close, Send } from '@mui/icons-material'
import { useValue } from '~/context/ContextProvider'
import { useRef } from 'react'
import { updateProfile } from '~/actions/user'

const Profile = () => {
  const { currentUser, profile, dispatch } = useValue()
  const nameRef = useRef()
  // close dialog
  const handleClose = ( ) => {
    dispatch({
      type:'UPDATE_PROFILE',
      payload: {
        ...profile,
        open:false
      }
    })
  }
  //send to backend
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    // pass user name and photo file to new function in user actions
    updateProfile( currentUser, { name, file: profile.file }, dispatch)

  }
  // change Avatar
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const photoURL = URL.createObjectURL(file)
      dispatch({
        type:'UPDATE_PROFILE',
        payload: {
          ...profile,
          file,
          photoURL
        }
      })
    }
  }
  return (
    <Dialog
      open={ profile.open }
      onClose={handleClose}
    >
      <DialogTitle>
        Profile
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
            label='Name'
            type='text'
            fullWidth
            inputRef={ nameRef }
            inputProps={{ minLength:2 }}
            required
            defaultValue={ currentUser?.name }
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
            Update
          </Button>
        </DialogActions>
      </form>

    </Dialog>
  )
}

export default Profile