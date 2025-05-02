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

  // Kiểm tra containerRef và mapRef trước khi sử dụng
  useEffect(() => {
    if (containerRef?.current && mapRef?.current) {
      // Kiểm tra và làm sạch containerRef:
      if (containerRef.current.children[0]) {
        containerRef.current.removeChild(containerRef.current.children[0])
      }
      // Add khung tìm kiếm vào giao diện thông qua useRef
      containerRef.current.appendChild(ctrl.onAdd(mapRef.current.getMap()))

      // Kết quả tìm kiếm
      ctrl.on('result', (e) => {
        const coords = e.result.geometry.coordinates
        // Lấy ra address gần với địa điểm tìm kiếm
        dispatch(filterAddress({
          lng: coords[0],
          lat: coords[1]
        }))
      })
      // Khi clear
      ctrl.on('clear', () => dispatch(clearAddress()))
    }
  }, [containerRef, mapRef, dispatch]) // Thêm các dependency vào array để tránh lỗi

  return null
}

export default GeocoderInput
