import { Avatar, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import pendingIcon from './icons/progress1.svg'
import { Check } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { updateDetail } from '~/redux/actions/needHelpPoint'
const InfoField = ({ mainProps, optionalProps={}, minLength }) => {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  let timer
  const handleChange = (e) => {
    dispatch(updateDetail( { [e.target.name]:e.target.value }))

    if (!editing ) setEditing(true)
    clearTimeout(timer)
    timer= setTimeout(() => {
      setEditing(false)
      if (e.target.value.length < minLength) {
        if (!error) setError(true)
        if (success) setSuccess(false)
      } else {
        if (error) setError(false)
        if (!success) setSuccess(true)
      }
    }, 1000)
  }
  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={ error }
      helperText={ error && `This field must be ${minLength} characters or more `}
      color={success ? 'success': 'primary'}
      variant='outlined'
      onChange={handleChange}
      required
      InputProps={{
        endAdornment:(
          <InputAdornment position='end'>
            {
              editing ? (
                <Avatar src={pendingIcon} sx={{ height:70 }}/>
              ):(
                success && <Check color='success'/>
              )
            }</InputAdornment>
        )
      }}
    />
  )
}

export default InfoField