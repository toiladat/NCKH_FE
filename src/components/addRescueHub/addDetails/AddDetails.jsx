import { Stack } from '@mui/material'
import InfoField from './infoField'
import AddTime from './AddTime'
import { useSelector } from 'react-redux'

const AddDetails = () => {
  const { details_rescue } = useSelector( state => state.rescueHubPointReducer)
  const { description, timeStart, timeEnd }= details_rescue

  return (
    <Stack
      sx={{
        alignItems:'center',
        '& .MuiTextField-root':{
          width:'100%',
          maxWidth:500,
          m:1
        }
      }}
    >
      <AddTime mainProps={{ label:'Thời gian bắt đầu', value:timeStart }} type_payload='timeStart'/>
      <AddTime mainProps={{ label:'Thời gian kết thúc', value:timeEnd }} type_payload='timeEnd'/>

      <InfoField
        mainProps={{ name:'description', label:'Description', value:description }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  )
}

export default AddDetails