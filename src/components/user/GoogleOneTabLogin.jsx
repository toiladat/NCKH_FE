import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const GoogleOneTabLogin = () => {
  return (
    <Button
      variant='outlined'
      startIcon={<Google/>}
    >
      Login width Google
    </Button>
  )
}

export default GoogleOneTabLogin