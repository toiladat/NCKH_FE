import { Marker } from 'react-map-gl'
import MapBase from '../map/MapBase'
import { useState } from 'react'
import { Chip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateLocationRescueEnd } from '~/redux/actions/rescueHubPoint'

const AddLocationEnd = () => {
  const { location_rescue } = useSelector( state => state.rescueHubPointReducer)
  const dispatch = useDispatch()

  const [showChip, setShowChip] = useState(false)

  const endMarker =
  <Marker
    key='end-marker'
    color='red'
    style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}
    latitude={location_rescue.end?.lat || 0}
    longitude={location_rescue.end?.lng || 0}
    draggable
    onDrag={() => setShowChip(true)}
    onDragEnd={(e) => {
      setShowChip(false)
      if (e.lngLat) {
        dispatch(updateLocationRescueEnd({
          lng: e.lngLat.lng,
          lat: e.lngLat.lat
        }))
      }
    }}>
    { showChip ? <Chip label="Điểm phân phối" size="small" color='warning' />: ''}

  </Marker>
  const startMarker =
  <Marker
    key='start-marker'
    latitude={location_rescue.start?.lat || 0}
    longitude={location_rescue.start?.lng || 0}
  />
  return <MapBase marker={ [endMarker, startMarker]} target={'END'} />
}

export default AddLocationEnd
