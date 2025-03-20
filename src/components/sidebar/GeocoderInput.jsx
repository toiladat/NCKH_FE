import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useValue } from '~/context/ContextProvider'
import { clearAddress, filterAddress } from '~/redux/actions/needHelpPoint'

const ctrl = new MapboxGeocoder({
  marker:false,
  accessToken : import.meta.env.VITE_MAPBOX_TOKEN

})
const GeocoderInput = () => {
  const { mapRef, containerRef } = useValue()
  const dispatch = useDispatch()
  //Kiểm tra và làm sạch containerRef:
  useEffect( () => {
    if ( containerRef?.current?.children[0]) {
      containerRef.current.removeChild(containerRef.current.children[0])
    }
    // Add khung tìm kiếm vào giao diện thông qua useRef
    containerRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap()))

    //result: Được kích hoạt khi người dùng chọn một địa điểm từ kết quả tìm kiếm.
    ctrl.on('result', (e) => {
      const coords = e.result.geometry.coordinates
      // lấy ra address gần với địa điểm tìm kiếm
      dispatch(filterAddress({
        lng: coords[0],
        lat: coords[1]
      }))
    })
    // khi clear: gia tri da tim kiem
    ctrl.on('clear', () => dispatch(clearAddress()))
  }, [])
  return (
    null
  )
}

export default GeocoderInput