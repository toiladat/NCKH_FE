import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '~/context/ContextProvider'
import { jwtDecode } from 'jwt-decode'


const GoogleOneTabLogin = () => {
  const { dispatch } = useValue()
  const [disabled, setDisabled] = useState(false)
  const handleResponse = (response) => { // google tra ve thong tin user
    const token = response.credential
    const decodedToken = jwtDecode(token) // user data from google
    // console.log(decodedToken);
    const { sub:id, email, name, picture:photoURL } = decodedToken
    dispatch({
      type:'UPDATE_USER',
      payload: {
        id, email, name, photoURL, token, google: true
      }
    })
    dispatch({ type:'CLOSE_LOGIN' })

  }

  const handleGoogleLogin = () => {
    setDisabled(true) // tránh việc click nhiều lần
    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse
      })
      window.google.accounts.id.prompt((notification) => { // Show accounts và user chọn account
        if (notification.isNotDisplayed()) {
          throw new Error('Try to clear the cookies or try again later ')
        }
        if ( notification.isSkippedMoment() || notification.isDismissedMoment() ) {
          setDisabled(false)
        }
      })
    }
    catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        playload: {
          open:true,
          severity:'error',
          message: error.message
        }
      })
      console.log('loi roii ne');
      console.log(error);
    }
  }
  return (
    <Button
      variant='outlined'
      startIcon={<Google/>}
      disabled={ disabled }
      onClick={handleGoogleLogin}
    >
      Login width Google
    </Button>
  )
}

export default GoogleOneTabLogin