import { Marker } from 'react-map-gl'
import MapBase from '../map/MapBase'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chip } from '@mui/material'
import { updateAlert } from '~/redux/actions/util'
import handleUpdateSite from '~/utils/HandleUpdateSite'

const AddLocationStart = () => {
  const { location_rescue } = useSelector( state => state.rescueHubPointReducer)
  const dispatch = useDispatch()

  const [showChip, setShowChip] = useState(false)
  const [markerKey, setMarkerKey] = useState(0)

  const marker =<Marker
    key={markerKey}
    style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}
    latitude={location_rescue.start?.lat || 21.0285}
    longitude={location_rescue.start?.lng || 105.8542 }
    draggable
    onDrag={() => setShowChip(true)}
    onDragEnd={(e) => {
      setShowChip(false)
      if (e.lngLat) {
        handleUpdateSite(dispatch, updateAlert, setMarkerKey, 'rescue-hub-start', e.lngLat)
      }
    }}>
    { showChip ? <Chip label="Điểm tập kết" size="small" color='primary' />: ''}
  </Marker>

  return (
    <MapBase marker = { marker} setMarkerKey= {setMarkerKey} target={'start'}/>
  )
}

export default AddLocationStart