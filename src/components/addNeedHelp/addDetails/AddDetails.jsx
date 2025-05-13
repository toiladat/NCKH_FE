import { FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import InfoField from './infoField'
import { useDispatch, useSelector } from 'react-redux'
import { updateDetail } from '~/redux/actions/needHelpPoint'

const AddDetails = () => {
  const dispatch = useDispatch()
  const { details } = useSelector( state => state.needHelpPointReducer)

  const { title, description, price }= details
  const [costType, setCostType]= useState(price ? 1 : 0)
  const handleCostTypeChange = (e) => {
    const costType = Number(e.target.value)
    setCostType(costType)
    if (costType === 0 ) {
      dispatch(updateDetail({ price:0 }))
    } else {
      dispatch(updateDetail({ price:150 }))
    }
  }
  const handlePriceChange = ( e ) => {
    dispatch(updateDetail({ price:e.target.value }))
  }
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
      <FormControl>
        <RadioGroup
          name='costType'
          value={costType}
          row
          onChange={handleCostTypeChange}
        >
          {Boolean(costType) && (
            <TextField
              sx={{
                width:'7ch !important'
              }}
              variant='standard'
              InputProps={{
                startAdornment:(
                  <InputAdornment position='start'>$</InputAdornment>
                )
              }}
              inputProps={{ type: 'number', min:1, max: 50 }}
              value={price}
              onChange={handlePriceChange}
              name='price'
            />
          )}
        </RadioGroup>

      </FormControl>
      <InfoField
        mainProps={{ name:'title', label:'Thông tin liên hệ', value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{ name:'description', label:'Description', value:description }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  )
}

export default AddDetails