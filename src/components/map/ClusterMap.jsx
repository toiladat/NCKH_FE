import { useEffect, useState } from 'react'
import { getRooms } from '~/actions/room'
import { useValue } from '~/context/ContextProvider'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Avatar, Box, Paper, Tooltip } from '@mui/material'
import Supercluster from 'supercluster'
import './cluster.css'
import GeocoderInput from '../sidebar/GeocoderInput'

const supercluster = new Supercluster({
  radius:75,
  maxZoom:20
})
const ClusterMap = () => {
  const { rooms, dispatch, mapRef, filteredRooms } = useValue()
  const [points, setPoints] = useState([])
  const [clusters, setClusters] = useState([])
  const [bounds, setBounds] = useState([-180, -85, 180, 85])
  const [zoom, setZoom]= useState(0)

  // Lấy ra thông tin các phòng ở lần ren đầu
  useEffect( () => {
    getRooms(dispatch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Chuyển đổi danh sách rooms thành danh sách points theo chuẩn GeoJSON
  // dùng để hiển thị hoặc gom cụm các điểm trên bản đồ.
  useEffect( () => {
    const points = filteredRooms.map( room => ({
      type:'Feature',
      properties:{
        cluster:false,
        roomId: room._id,
        price: room.price,
        title:room.title,
        description: room.description,
        lng:room.lng,
        lat:room.lat,
        images:room.images,
        uPhoto:room.userInfor?.photoURL || '',
        uName:room.userInfor?.name || ''
      },
      geometry:{
        type:'Point',
        coordinates:[parseFloat(room.lng), parseFloat(room.lat)]
      }
    }))
    setPoints(points)
  }, [filteredRooms])

  useEffect(() => {
    //nạp toàn bộ danh sách points vào Supercluster để tính toán các cụm.
    supercluster.load(points)
    //Trả về danh sách các cụm (cluster) hoặc các điểm đơn lẻ trong phạm vi bản đồ hiện tại (bounds) và mức zoom hiện tại (zoom).
    setClusters(supercluster.getClusters(bounds, zoom))
    //State clusters chứa danh sách các cụm hoặc điểm đơn lẻ hiện tại để hiển thị trên bản đồ.
  }, [points, zoom, bounds])


  //Lấy phạm vi (bounds) của bản đồ hiện tại để làm dữ liệu đầu vào cho việc tính cụm (clusters).
  useEffect(() => {
    if (mapRef.current) {
      //Lấy đối tượng bản đồ hiện tại từ thư viện Mapbox.
      //Lấy phạm vi hiện tại của bản đồ (4 góc trái/phải, trên/dưới).
      //Chuyển phạm vi từ đối tượng sang mảng phẳng [west, south, east, north].
      setBounds(mapRef.current.getMap().getBounds().toArray().flat())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef?.current])
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <ReactMapGL
        ref={mapRef}
        initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters.map( cluster => {
          const { cluster: isCluster, point_count } = cluster.properties
          const [longitude, latitude] = cluster.geometry.coordinates
          if ( isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                longitude={longitude}
                latitude={latitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (point_count / points.length) * 20}px`,
                    height: `${10 + (point_count / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    )
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
                      speed: 1
                    })
                  }}
                >
                  {point_count}
                </div>
              </Marker>
            )
          }
          else {
            return (
              <Marker
                key={`room-${cluster.properties.roomId}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Tooltip title={cluster.properties.uName}>
                  <Avatar
                    src={cluster.properties.uPhoto}
                    component={Paper}
                    elevation={2}
                  />
                </Tooltip>
              </Marker>
            )
          }
        })}

        {/* filter address */}
        <GeocoderInput/>
      </ReactMapGL>
    </Box>
  )
}

export default ClusterMap