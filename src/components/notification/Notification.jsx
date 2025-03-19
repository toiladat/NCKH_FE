import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateAlert } from '~/redux/actions/util'

const Notification = () => {
  const { alert } = useSelector(state => state.utilReducer)
  const dispatch = useDispatch()

  // Reason : Là lý do dẫn đến việc đóng Snackbar.
  // Event : xảy ra khi Snackbar đóng ( click away or timeout)
  const handleClose= ( event, reason) => {
    if (reason === 'clickaway') return //Điều này ngăn Snackbar đóng khi người dùng vô tình click ra ngoài
    dispatch(updateAlert({
      ... alert,
      open:false
    }))

  }
  return (
    <Snackbar
      open={ alert.open }
      autoHideDuration={5000}
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