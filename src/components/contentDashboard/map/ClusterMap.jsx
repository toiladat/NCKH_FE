import { useEffect, useState } from 'react'
import { getNeedHelpPoints } from '~/actions/needHelpPoint'
import { useValue } from '~/context/ContextProvider'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Avatar, Box, Paper, Tooltip } from '@mui/material'
import Supercluster from 'supercluster'
import './cluster.css'
import GeocoderInput from '../../sideBar/GeocoderInput'
import PopupNeedHelpPoint from '../../needHelpPoint/PopupNeedHelpPoint'

const supercluster = new Supercluster({
  radius:75,
  maxZoom:20
})


const ClusterMap = () => {
  const { dispatch, mapRef, filteredNeedHelpPoints } = useValue()
  const [points, setPoints] = useState([])
  const [clusters, setClusters] = useState([])
  const [bounds, setBounds] = useState([-180, -85, 180, 85])
  const [zoom, setZoom]= useState(0)
  const [popupInfo, setPopupInfo] = useState(null)

  // Lấy ra thông tin các phòng ở lần ren đầu
  useEffect( () => {
    getNeedHelpPoints(dispatch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Chuyển đổi danh sách needHelpPoints thành danh sách points theo chuẩn GeoJSON
  // dùng để hiển thị hoặc gom cụm các điểm trên bản đồ.
  useEffect( () => {
    const points = filteredNeedHelpPoints.map( point => ({
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
  }, [filteredNeedHelpPoints])

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
        height: '65vh',
        width: '40vw',
        position: 'absolute',
        top:'125px',
        left: "100px",
        borderRadius: '20px',
        overflow: 'hidden',
        border: "0.5px solid #000",
        boxShadow: "5px 5px 15px  rgba(0, 0, 0, 0.3)" 

      }}
    >
      <ReactMapGL
        projection='globe'
        ref={mapRef}
        initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
        mapStyle="mapbox://styles/mapbox/standard"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%',  }}
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
                key={`needHelpPoint-${cluster.properties.needHelpPointId}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Tooltip title={cluster.properties.uName}>
                  <Avatar
                    src={cluster.properties.uPhoto}
                    component={Paper}
                    elevation={2}
                    onClick={ () => setPopupInfo(cluster.properties)}
                  />
                </Tooltip>
              </Marker>
            )
          }
        })}

        {/* filter address */}
        <GeocoderInput/>

        {popupInfo &&
          <Popup
            longitude={ popupInfo.lng}
            latitude={popupInfo.lat}
            maxWidth='auto'
            closeOnClick={false}
            focusAfterOpen={false}
            onClose={ () => { setPopupInfo(null) }}
          >
            <PopupNeedHelpPoint {...{ popupInfo }}/>
          </Popup>
        }
      </ReactMapGL>
    </Box>
  )
}

export default ClusterMap