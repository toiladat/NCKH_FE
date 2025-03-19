import { Marker } from 'react-map-gl'
import MapBase from '../map/MapBase'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chip } from '@mui/material'
import { updateLocationRescueStart } from '~/redux/actions/rescueHubPoint'

const AddLocationStart = () => {
  const { location_rescue } = useSelector( state => state.rescueHubPointReducer)
  const dispatch = useDispatch()

  const [showChip, setShowChip] = useState(false)
  const marker =<Marker
    style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}
    latitude={location_rescue.start?.lat || 0}
    longitude={location_rescue.start?.lng || 0}
    draggable
    onDrag={() => setShowChip(true)}
    onDragEnd={(e) => {
      setShowChip(false)
      if (e.lngLat) {
        dispatch(updateLocationRescueStart({
          lng: e.lngLat.lng,
          lat: e.lngLat.lat
        }))
      }
    }}>
    { showChip ? <Chip label="Điểm tập kết" size="small" color='primary' />: ''}
  </Marker>
  return (
    <MapBase marker = { marker} target={'START'}/>
  )
}

export default AddLocationStart