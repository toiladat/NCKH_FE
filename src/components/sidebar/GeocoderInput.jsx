import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useEffect } from 'react'
import { useValue } from '~/context/ContextProvider'

const ctrl = new MapboxGeocoder({
  marker:false,
  accessToken : import.meta.env.VITE_MAPBOX_TOKEN

})
const GeocoderInput = () => {
  const { mapRef, containerRef, dispatch } = useValue()

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
      dispatch({
        type:'FILTER_ADDRESS',
        payload:{
          lng: coords[0],
          lat: coords[1]
        }
      })
    })
    // khi clear: gia tri da tim kiem
    ctrl.on('clear', () => dispatch({ type: 'CLEAR_ADDRESS' }))
  }, [])
  return (
    null
  )
}

export default GeocoderInput