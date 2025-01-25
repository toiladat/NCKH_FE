import { Box, Slider, Typography } from '@mui/material'
import { useValue } from '~/context/ContextProvider'

const marks=[
  { value:0, label:'$0' },
  { value:25, label:'$25' },
  { value:50, label:'$50' }
]
const PriceSlider = () => {
  const { priceFilter, dispatch } = useValue()
  return (
    <Box sx={{ mt: 5, width:232 }}>
      <Typography>Max Price : {`$ ${priceFilter}`}</Typography>
      <Slider
        min={0}
        max={50}
        defaultValue={50}
        valueLabelDisplay='auto'
        marks={marks}
        value={priceFilter}
        onChange={(e, newPrice) => dispatch({ type: 'FILTER_PRICE', payload:newPrice })}
      />
    </Box>
  )
}

export default PriceSlider