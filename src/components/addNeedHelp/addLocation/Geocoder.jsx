import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useDispatch } from 'react-redux'
import { updateLocation } from '~/redux/actions/needHelpPoint'
const Geocoder = () => {
  const dispatch = useDispatch()
  const ctrl = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    marker: false,
    collapsed:true
  })
  useControl( () => ctrl)
  ctrl.on('result', e => {
    const coords= e.result.geometry.coordinates
    dispatch(updateLocation({
      lng: coords[0],
      lat: coords[1]
    }))
  })
  return null
}

export default Geocoder