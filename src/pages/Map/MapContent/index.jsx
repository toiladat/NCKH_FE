import Box from '@mui/material/Box'
import { useRef, useEffect, useState } from 'react'
import { SearchBox } from '@mapbox/search-js-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const INITIAL_CENTER = [105.5376, 16.9076]
const INITIAL_ZOOM = 5.08
function MapContent() {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)

  const mapInstanceRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGllbmRhdDI5MjAwMyIsImEiOiJjbTQxNnJzcTQxdXh0MnBteGsyaGl4dm5vIn0.OpUqrAbs8JD7t_Q2LGi6NA'

    // Khởi tạo bản đồ
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // Gắn vào ref
      style: 'mapbox://styles/mapbox/streets-v12',
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    })

    // Lưu instance bản đồ
    mapRef.current = map

    // Cập nhật state khi bản đồ di chuyển
    map.on('move', () => {
      const mapCenter = map.getCenter()
      setCenter([mapCenter.lng, mapCenter.lat])
      setZoom(map.getZoom())
    })

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    mapInstanceRef.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => map.remove()
  }, [])

  return (
    <Box sx={{
      width:'100%',
      height:( theme ) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeigh})`,

    }}>
      <Box
        sx={{
          width:'100%',
          display:'flex',
          zIndex:100,
          position:'fixed',
          justifyContent:'space-between'
        }}
      >
        <Box sx={{width:'500px', color:'black', padding:'10px 10px', bgcolor:'#ddd'}}>
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
        </Box>
        <Box
          sx={{
            width:'300px',
            minHeight:'100px'
          }}
        >
          <SearchBox
            accessToken={mapboxgl.accessToken}
            map={mapInstanceRef.current}
            mapboxgl={mapboxgl}
            value={inputValue}
            onChange={(d) => {
              setInputValue(d)
            }}
            marker
          />
        </Box>
      </Box>
      <Box id="map-container" ref={mapContainerRef} style={{ height: '100%', width:'100%', overflow:'visible' }} />
    </Box>
  )
}

export default MapContent
