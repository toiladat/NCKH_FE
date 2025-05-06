import { Box } from '@mui/material'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux'

import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from 'react'
import Geocoder from './Geocoder'
import { updateLocation } from '~/redux/actions/needHelpPoint'
import { updateAlert } from '~/redux/actions/util'
import handleUpdateSite from '~/utils/HandleUpdateSite'

const AddLocation = () => {
  const { location } = useSelector( state => state.needHelpPointReducer)

  const dispatch = useDispatch()
  const mapRef = useRef()
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN
  const query = 'ip address'
  // lần đầu load sẽ trả về long và lat dựa trên địa chỉ ip ( đang bug vì chưa tìm được API trả về đúng )
  useEffect(() => {
    if (!location?.lng && !location?.lat) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}`)
        .then(res => res.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            // const [longitude, latitude] = data.features[0].center
            const longitude=105.8341785
            const latitude= 20.9915406
            if (mapRef.current) {
              mapRef.current.flyTo({
                center: [longitude, latitude],
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
              })
            }
            dispatch(updateLocation({
              lng: longitude,
              lat: latitude
            }))
          }
        })
        .catch(error => console.error('Error fetching location:', error))
    }
  }, [])
  const [markerKey, setMarkerKey] = useState(0)

  return (
    <Box
      sx={{
        height: 400,
        position: 'relative'
      }}
    >
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={ accessToken }
        initialViewState={{
          longitude: location?.lng || 0,
          latitude: location?.lat || 0,
          zoom: 8
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          key={markerKey}
          latitude={location?.lat || 0}
          longitude={location?.lng || 0}
          draggable
          onDragEnd={(e) => {
            if (e.lngLat) {
              handleUpdateSite(dispatch, updateAlert, setMarkerKey, 'need-help-point', e.lngLat)
            }
          }}
        />
        <NavigationControl position='bottom-right'/>
        <GeolocateControl
          position='top-left'
          trackUserLocation
          onGeolocate={ e => {
            const lngLat= {
              lng: e.coords.longitude,
              lat: e.coords.latitude
            }
            handleUpdateSite(dispatch, updateAlert, setMarkerKey, 'need-help-point', lngLat)
          } }
        />
        <Geocoder {...{ dispatch, updateAlert, setMarkerKey }}/>
      </ReactMapGL>
    </Box>
  )
}

export default AddLocation