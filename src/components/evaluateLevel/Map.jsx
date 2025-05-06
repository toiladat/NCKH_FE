import { Box } from '@mui/material'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux'

import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'
// import Geocoder from './Geocoder'
import { updateAlert } from '~/redux/actions/util'
import handleUpdateSite from '~/utils/HandleUpdateSite'
import Geocoder from './Geocoder'

const Map = () => {
  const { location } = useSelector( state => state.evaluatedPointReducer)
  const dispatch = useDispatch()
  const [key, setMarkerKey] = useState(0)

  return (
    <Box
      sx={{
        height: '100%',
        width:600,
        position: 'relative',
        borderRadius:4,
        overflow:'hidden',
        ml:3
      }}
    >
      <ReactMapGL
        mapboxAccessToken={ import.meta.env.VITE_MAPBOX_TOKEN }
        initialViewState={{
          longitude: location?.lng || 0,
          latitude: location?.lat || 0,
          zoom: 8
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          key={key}
          latitude={location?.lat || 0}
          longitude={location?.lng || 0}
          draggable
          onDragEnd={(e) => {
            if (e.lngLat) {
              handleUpdateSite(dispatch, updateAlert, setMarkerKey, 'evaluated-point', e.lngLat)
            }
          }}
        />
        <NavigationControl position='bottom-right'/>

        <Geocoder {...{ dispatch, updateAlert, setMarkerKey }}/>
      </ReactMapGL>
    </Box>
  )
}

export default Map