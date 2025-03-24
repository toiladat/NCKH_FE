import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useDispatch } from 'react-redux'
import { updateDetailRescue } from '~/redux/actions/rescueHubPoint'

const AddTime = ({ mainProps, type_payload }) => {
  const dispatch = useDispatch()
  const handleChange = (newValue) => {
    dispatch(updateDetailRescue({
      [type_payload]: newValue
    }))
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        {...mainProps}
        onChange={handleChange}
        slotProps={{ textField: { variant: 'outlined' } }}
      />
    </LocalizationProvider>
  )
}

export default AddTime
