import { Alert, Snackbar } from '@mui/material'
import { useValue } from '~/context/ContextProvider'

const Notification = () => {
  const { alert, dispatch }= useValue()
  // Reason : Là lý do dẫn đến việc đóng Snackbar.
  // Event : xảy ra khi Snackbar đóng ( click away or timeout)
  const handleClose= ( event, reason) => {
    if (reason === 'clickaway') return //Điều này ngăn Snackbar đóng khi người dùng vô tình click ra ngoài
    dispatch({
      type : 'UPDATE_ALERT',
      payload: {
        ... alert,
        open:false
      }
    })

  }
  return (
    <Snackbar
      open={ alert.open }
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical:'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity} // Mức độ cảnh báo
        sx={{ width: '100%' }}
        variant='filled'
        elevation={ 6 }
      >
        {alert.message}

      </Alert>
    </Snackbar>
  )
}

export default Notification