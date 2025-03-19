import { Box } from '@mui/material'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState, useMemo } from 'react'
import Geocoder from '../geoCoder/Geocoder'

import { getNeedHelpPoints } from '~/actions/needHelpPoint'
import Supercluster from 'supercluster'
import { Avatar, Paper, Tooltip } from '@mui/material'
import { updateLocationRescueStart } from '~/redux/actions/rescueHubPoint'


const MapBase = ({ marker, target }) => {

  const { location_rescue } = useSelector( state => state.rescueHubPointReducer)
  const dispatch = useDispatch()

  const mapRef = useRef()
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN
  const query = 'ip address'

  const supercluster = useMemo(() => // superclust sẽ có points
    new Supercluster({
      radius: 75,
      maxZoom: 20
    }), []
  )

  const { needHelpPoints } = useSelector( state => state.needHelpPointReducer)

  const [points, setPoints] = useState([])
  const [clusters, setClusters] = useState([])
  const [bounds, setBounds] = useState([-180, -85, 180, 85])
  const [zoom, setZoom]= useState(0)

  // lần đầu load sẽ trả về long và lat dựa trên địa chỉ ip ( đang bug vì chưa tìm được API trả về đúng )
  useEffect(() => {
    if (!location_rescue.start?.lng && !location_rescue.start?.lat) {
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
            dispatch(updateLocationRescueStart({
              lng: longitude,
              lat: latitude
            }))
          }
        })
        // eslint-disable-next-line no-console
        .catch(error => console.error('Error fetching location:', error))
    }
  }, [])

  // Lấy ra thông tin các phòng ở lần ren đầu
  useEffect( () => {
    getNeedHelpPoints(dispatch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Chuyển đổi danh sách needHelpPoints thành danh sách points theo chuẩn GeoJSON
  // dùng để hiển thị hoặc gom cụm các điểm trên bản đồ.
  useEffect( () => {
    const points = needHelpPoints.map( point => ({
      type:'Feature',
      properties:{
        cluster:false,
        needHelpPointId: point._id,
        price: point.price,
        title:point.title,
        description: point.description,
        lng:point.lng,
        lat:point.lat,
        images:point.images,
        uPhoto:point.userInfor?.photoURL || '',
        uName:point.userInfor?.name || ''
      },
      geometry:{
        type:'Point',
        coordinates:[parseFloat(point.lng), parseFloat(point.lat)]
      }
    }))
    setPoints(points)
  }, [needHelpPoints])

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
        height: 400,
        position: 'relative'
      }}
    >
      <ReactMapGL
        key={'a'}
        ref={mapRef}
        mapboxAccessToken={ accessToken }
        initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {/* Các maker start, end */}
        {marker }

        {clusters && clusters?.map( (cluster, index ) => {
          const { cluster: isCluster, point_count } = cluster.properties
          const [longitude, latitude] = cluster.geometry.coordinates

          if ( isCluster) {
            return (
              <Marker
                style={{
                  background: (() => {
                    if (point_count < 5) return '#f1f'
                    else if (point_count < 10) return '#51bb'
                    return '#f28c'
                  })(),
                  borderRadius:'50%'
                }}
                key={cluster.id ? `cluster-${cluster.id}` : `temp-${index}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Box
                  className="cluster-marker"
                  style={{
                    width: `${18 + (point_count / points.length) * 20}px`,
                    height: `${18 + (point_count / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const zoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    )// Supercluster sẽ tìm cụm có ID đó và tính toán mức zoom tối thiểu mà tại đó cụm sẽ bị vỡ ra thành nhiều cụm nhỏ hơn
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom,
                      speed: 1
                    })
                  }}
                >
                  {point_count}
                </Box>
              </Marker>
            )
          }
          else {
            return (
              <Marker
                key={cluster.properties.needHelpPointId ? `needHelpPoint-${cluster.properties.needHelpPointId}` : `temp-point-${index}`}
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
        <Geocoder target ={target}/>

      </ReactMapGL>

    </Box>
  )
}

export default MapBase