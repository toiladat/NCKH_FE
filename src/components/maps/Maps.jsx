import { useEffect, useState } from 'react'
import { getNeedHelpPoints } from '~/actions/needHelpPoint'
import { useValue } from '~/context/ContextProvider'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Avatar, Paper, Tooltip, Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Typography } from '@mui/material'
import Supercluster from 'supercluster'
import './map.css'
import GeocoderInput from '../sidebar/GeocoderInput'
// import PopupNeedHelpPoint from '../needHelpPoint/PopupNeedHelpPoint'
import { getRescueHubPoints } from '~/actions/rescueHubPoint'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import ErrorBoundary from './ErrorBoundary'
// import { HeightOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import PopupPoint from './PopupPoint'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import RoomIcon from '@mui/icons-material/Room';

const supercluster = new Supercluster({
  radius:75,
  maxZoom:20
})

const Maps = () => {
  const { mapRef, containerRef } = useValue()
  const { filteredRescueHubPoints } = useSelector( state => state.rescueHubPointReducer)
  const { filteredNeedHelpPoints } = useSelector( state => state.needHelpPointReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        _id: point._id,
        validByUsers: point.validByUsers,
        price: point.price,
        title: point.title,
        description: point.description,
        lng: point.lng,
        rating:point.rating,
        lat: point.lat,
        images: point.images,
        userInfor:point.userInfor,
        createdAt:point.createdAt
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
        rating:point.rating,
        supplies: point.supplies,
        start_time: point.start_time,
        end_time: point.end_time,
        location_start: point.location_start,
        location_end: point.location_end,
        cluster: false,
        _id: point._id,
        description: point.description,
        lng: point?.location_start?.lng,
        validByUsers: point.validByUsers,
        lat: point?.location_start?.lat,
        images: point.images,
        userInfor:point.userInfor,
        createdAt:point.createdAt
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(point?.location_start?.lng), parseFloat(point?.location_start?.lat)]
      }
    }))
    const points =[...needHelps, ...rescueHubs]
    // Nạp dữ liệu vào Supercluster để gom cụm các điểm trên bản đồ
    supercluster?.load(points)
    // Lấy phạm vi bản đồ hiện tại và cập nhật danh sách cụm
    if (mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds().toArray().flat()
      setClusters(supercluster?.getClusters(bounds, zoom))
    }
  }, [filteredNeedHelpPoints, zoom])

  const actions = [
    { icon: <AddIcon />, name: 'Tạo chương trình cứu trợ', path: '/addrescuehub' },
    { icon: <AddIcon />, name: 'Tạo điểm cứu trợ', path: '/addneedhelp' },
    { icon: <HealthAndSafetyIcon />, name: 'Nhận hỗ trợ' }
  ]

  const newsArticles = [
    {
      title: 'Một tia hy vọng mới cho anh bảy và gia đình sau cơn bão Yagi',
      link: 'https://www.unicef.org/vietnam/vi/nh%E1%BB%AFng-c%C3%A2u-chuy%E1%BB%87n/m%E1%BB%99t-tia-hy-v%E1%BB%8Dng-m%E1%BB%9Bi-cho-anh-b%E1%BA%A3y-v%C3%A0-gia-%C4%91%C3%ACnh-sau-c%C6%A1n-b%C3%A3o-yagi'
    },
    {
      title: '431 triệu trẻ em phải chuyển cho ở do các thảm họa liên quan đến thời tiết',
      link: 'https://www.unicef.org/vietnam/vi/thong-cao-bao-chi/431-trieu-tre-em-phai-chuyen-cho-o-o-do-cac-tham-hoa-lien-quan-den-thoi-tiet'
    }
    // Thêm các bài báo khác nếu có
  ]
  const [openForm, setOpenForm] = useState(false)

  const handleOpenForm = () => {
    setOpenForm(true) // Mở form khi nhấn vào "Nhận hỗ trợ"
  }

  const handleCloseForm = () => {
    setOpenForm(false) // Đóng form
  }
  return (
    <Box
      sx={{
        height: '93vh',
        width: '100vw',
        position: 'absolute'

      }}
    >
      <ReactMapGL
        projection='globe'
        ref={mapRef}
        initialViewState={{ latitude: 21.0285, longitude: 105.8542, zoom: 3.5 }}
        mapStyle='mapbox://styles/mapbox/standard'
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

        {clusters.map(cluster => {
          const { cluster: isCluster, point_count } = cluster.properties
          const [longitude, latitude] = cluster.geometry.coordinates

          return isCluster ? (
            <Marker key={`cluster-${cluster.id}`} longitude={longitude} latitude={latitude}>
              <div
                className='cluster-marker'
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

            <Marker
              key={`needHelpPoint-${cluster.properties.pointId}`}
              longitude={longitude}
              latitude={latitude}
              onClick={() => setPopupInfo(cluster.properties)}
            >
              <RoomIcon
                sx={{
                  fontSize: 45,
                  cursor: 'pointer',
                  color: cluster.properties.type === 'need-help-point' ? '#C62828' : 'blue', // đỏ thẫm
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))', // Bóng nhẹ dưới icon
                  transition: 'transform 0.2s ease, filter 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.2)',
                    filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5))', // Bóng đậm hơn khi hover
                  }
                }}
              />
            </Marker>


          )
        })}
        {/* Bộ lọc địa chỉ */}
        <ErrorBoundary>
          <GeocoderInput />
        </ErrorBoundary>
        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            maxWidth='auto'
            closeOnClick={false}
            focusAfterOpen={false}
            onClose={() => setPopupInfo(null)}
          >
            <PopupPoint {...{ popupInfo }} />
          </Popup>
        )}
      </ReactMapGL>

      <Box
        sx={{
          position: 'absolute',
          top: 40,
          left: 40,
          zIndex: 1,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: 'white',
          width: 450,
          boxShadow: 3
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            width: '100%',
            '& .mapboxgl-ctrl-geocoder': {
              width: '100% !important',
              maxWidth: '100% !important'
            }
          }}
        />
      </Box>


      <SpeedDial
        ariaLabel="Thao tác bản đồ"
        sx={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          '& .MuiFab-primary': {
            backgroundColor: '#1976d2',
            color: 'white',
            boxShadow: 4,
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              if (action.name === 'Nhận hỗ trợ') {
                handleOpenForm() // Mở form khi nhấn "Nhận hỗ trợ"
              }
              else {
                navigate(action.path)
              }
            }}

          />
        ))}
      </SpeedDial>

      {openForm && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 110, // nằm trên SpeedDial một chút
            right: 40,
            width: 600,
            bgcolor: 'white',
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 4,
            p: 2,
            zIndex: 1300
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <strong>Những chiến dịnh cần được hỗ trợ</strong>
            <span
              onClick={handleCloseForm}
              style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: 18 }}
            >
              ×
            </span>
          </Box>
          {/* Nội dung form bạn muốn */}
          <Box
            sx={{
              borderRadius: 1,
              boxShadow: 6,
              backgroundColor: 'rgba(66, 165, 245, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '32px'

            }}
          >
            <Box sx={{ px: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: '700' }}>Đang thực hiện</Typography>
              <Typography variant="h4">0</Typography>
            </Box>

            <Box sx={{ px: 4, borderLeft: '2px solid white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: '700' }}>Đạt mục tiêu</Typography>
              <Typography variant="h4">0</Typography>
            </Box>

            <Box sx={{ px: 4, borderLeft: '2px solid white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: '700' }}>Đã kết thúc</Typography>
              <Typography variant="h4">0</Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Tin tức liên quan:
            </Typography>
            <Box sx={{ mt: 2 }}>
              {newsArticles.map((article, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

        </Box>
      )}

    </Box>
  )
}

export default Maps