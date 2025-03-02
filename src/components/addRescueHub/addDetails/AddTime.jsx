import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useValue } from '~/context/ContextProvider'

const AddTime = ({ mainProps, type_payload }) => {
  const { dispatch } = useValue( )

  const handleChange = (newValue) => {

    dispatch({
      type:'UPDATE_DETAILS_RESCUE',
      payload: {
        [type_payload]: newValue
      }
    })
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
