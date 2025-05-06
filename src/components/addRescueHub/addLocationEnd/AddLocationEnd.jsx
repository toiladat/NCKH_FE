import { Marker } from 'react-map-gl'
import MapBase from '../map/MapBase'
import { useState } from 'react'
import { Chip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateLocationRescueEnd } from '~/redux/actions/rescueHubPoint'
import handleUpdateSite from '~/utils/HandleUpdateSite'
import { updateAlert } from '~/redux/actions/util'

const AddLocationEnd = () => {
  const { location_rescue } = useSelector( state => state.rescueHubPointReducer)
  const dispatch = useDispatch()

  const [showChip, setShowChip] = useState(false)
  const [markerKey, setMarkerKey] = useState(0)

  const endMarker =
  <Marker
    key={markerKey}
    color='red'
    style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }}
    latitude={location_rescue.end?.lat || 21.0285}
    longitude={location_rescue.end?.lng || 105.8542 }
    draggable
    onDrag={() => setShowChip(true)}
    onDragEnd={(e) => {
      setShowChip(false)
      if (e.lngLat) {
        handleUpdateSite(dispatch, updateAlert, setMarkerKey, 'rescue-hub-end', e.lngLat)
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
  return <MapBase marker={[endMarker, startMarker]} target={'end'} setMarkerKey={setMarkerKey} />
}

export default AddLocationEnd
