import { Lock } from '@mui/icons-material'
import { Alert, AlertTitle, Button, Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openLogin } from '~/redux/actions/util'

const AccessMessage = () => {
  const dispatch = useDispatch()
  return (
    <Container
      sx={{ py: 5 }}
    >
      <Alert
        severity='error'
        variant='outlined'
      >
        <AlertTitle>Forbidden Access</AlertTitle>
        Pleces login or register to access this page
        <Button
          variant='outlined'
          sx={{ ml: 2 }}
          startIcon={<Lock/>}
          onClick={ () => dispatch(openLogin())}
        >Login</Button>
      </Alert>
    </Container>
  )
}

export default AccessMessage