import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import handleUpdateSite from '~/utils/HandleUpdateSite'
const Geocoder = ({ dispatch, updateAlert, setMarkerKey }) => {
  const ctrl = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    marker: false,
    collapsed:true
  })
  useControl( () => ctrl)
  ctrl.on('result', e => {
    const coords= e.result.geometry.coordinates
    const lngLat ={
      lng: coords[0],
      lat: coords[1]
    }
    handleUpdateSite(dispatch, updateAlert, setMarkerKey, 'evaluated-point', lngLat) // chua flyto ve cho cu duoc

  })
  return null
}

export default Geocoder