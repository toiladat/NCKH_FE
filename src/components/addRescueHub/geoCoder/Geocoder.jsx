import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { useDispatch } from 'react-redux'
import handleUpdateSite from '~/utils/HandleUpdateSite'
import { updateAlert } from '~/redux/actions/util'
const Geocoder = ( { target, setMarkerKey } ) => {
  const dispatch = useDispatch()
  const ctrl = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    marker: false,
    collapsed:true
  })
  useControl( () => ctrl)
  ctrl.on('result', e => {
    const coords= e.result.geometry.coordinates
    const lngLat = {
      lng: coords[0],
      lat: coords[1]
    }
    handleUpdateSite(dispatch, updateAlert, setMarkerKey, `rescue-hub-${target}`, lngLat) // chua flyto ve cho cu duoc

  })
  return null
}

export default Geocoder