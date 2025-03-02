import { useEffect, useState } from 'react'
import { getNeedHelpPoints } from '~/actions/needHelpPoint'
import { useValue } from '~/context/ContextProvider'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Avatar, Box, Paper, Tooltip } from '@mui/material'
import Supercluster from 'supercluster'
import './cluster.css'
import GeocoderInput from '../sideBar/GeocoderInput'
import PopupNeedHelpPoint from '../needHelpPoint/PopupNeedHelpPoint'
import { getRescueHubPoints } from '~/actions/rescueHubPoint'

const supercluster = new Supercluster({ radius: 75, maxZoom: 20 })

const ClusterMap = () => {
  const { dispatch, mapRef, filteredNeedHelpPoints, filteredRescueHubPoints } = useValue()
  const [clusters, setClusters] = useState([])
  const [zoom, setZoom] = useState(0)
  const [popupInfo, setPopupInfo] = useState(null)

  // Fetch dữ liệu ngay từ lần đầu render
  useEffect(() => {
    getNeedHelpPoints(dispatch)
    getRescueHubPoints(dispatch)
  }, [])

  // Xử lý danh sách `points` và cập nhật `clusters` trong một `useEffect`
  useEffect(() => {
    if (!filteredNeedHelpPoints.length) return
    const needHelps = filteredNeedHelpPoints.map(point => ({
      type: 'Feature',
      properties: {
        type:'need-help-point',
        cluster: false,
        pointId: point._id,
        price: point.price,
        title: point.title,
        description: point.description,
        lng: point.lng,
        lat: point.lat,
        images: point.images,
        uPhoto: point.userInfor?.photoURL || '',
        uName: point.userInfor?.name || ''
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(point.lng), parseFloat(point.lat)]
      }
    }))

    const rescueHubs = filteredRescueHubPoints.map(point => ({
      type: 'Feature',
      properties: {
        type:'rescue-hub-point',
        cluster: false,
        pointId: point._id,
        description: point.description,
        lng: point?.location_start?.lng,
        lat: point?.location_start?.lat,
        images: point.images,
        uPhoto: point.userInfor?.photoURL || '',
        uName: point.userInfor?.name || ''
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(point?.location_start?.lng), parseFloat(point?.location_start?.lat)]
      }
    }))

    const points =[...needHelps, ...rescueHubs]
    // Nạp dữ liệu vào Supercluster để gom cụm các điểm trên bản đồ
    supercluster.load(points)
    console.log(supercluster);
    
    // Lấy phạm vi bản đồ hiện tại và cập nhật danh sách cụm
    if (mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds().toArray().flat()
      setClusters(supercluster.getClusters(bounds, zoom))
    }
  }, [filteredNeedHelpPoints, zoom])
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
        projection='globe'
        ref={mapRef}
        initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
        mapStyle="mapbox://styles/mapbox/standard"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        onMoveEnd={() => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds().toArray().flat()
            setClusters(supercluster.getClusters(bounds, zoom))
          }
        }}
      >
        {filteredRescueHubPoints.map( point => (
          <Marker
            key={point._id}
            longitude={point?.location_start?.lng}
            latitude={point?.location_start?.lat}
          />
        ))}

        {clusters.map(cluster => {
          const { cluster: isCluster, point_count } = cluster.properties
          const [longitude, latitude] = cluster.geometry.coordinates

          return isCluster ? (
            <Marker key={`cluster-${cluster.id}`} longitude={longitude} latitude={latitude}>
              <div
                className="cluster-marker"
                style={{
                  width: `${18 + (point_count / clusters.length) * 4}px`,
                  height: `${18 + (point_count / clusters.length) * 4}px`,
                  background: point_count < 5 ? '#f1f' : point_count < 10 ? '#51bb' : '#f28c',
                  borderRadius: '50%'
                }}
                onClick={() => {
                  const newZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20)
                  mapRef.current.flyTo({ center: [longitude, latitude], zoom: newZoom, speed: 1 })
                }}
              >
                {point_count}
              </div>
            </Marker>
          ) : (
            <Marker key={`needHelpPoint-${cluster.properties.pointId}`} longitude={longitude} latitude={latitude}>
              <Tooltip title={cluster.properties.uName}>
                <Avatar
                  src={cluster.properties.uPhoto}
                  component={Paper}
                  elevation={2}
                  onClick={() => setPopupInfo(cluster.properties)}
                />
              </Tooltip>
            </Marker>
          )
        })}

        {/* Bộ lọc địa chỉ */}
        <GeocoderInput />

        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            maxWidth="auto"
            closeOnClick={false}
            focusAfterOpen={false}
            onClose={() => setPopupInfo(null)}
          >
            <PopupNeedHelpPoint {...{ popupInfo }} />
          </Popup>
        )}
      </ReactMapGL>
    </Box>
  )
}

export default ClusterMap
