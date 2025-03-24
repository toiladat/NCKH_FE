import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

const Loading = () => {
  const { loading } = useSelector(state => state.utilReducer)
  return (
    <Backdrop
      open={ loading }
      sx={{ zIndex: (theme) => theme.zIndex.modal +1 }}
    >
      <CircularProgress
        sx={{ color:'white' }}
      />
    </Backdrop>
  )
}

export default Loading