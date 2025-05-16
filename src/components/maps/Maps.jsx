import { useEffect, useState } from 'react'
import { getNeedHelpPoints } from '~/actions/needHelpPoint'
import { useValue } from '~/context/ContextProvider'
import ReactMapGL, { Layer, Marker, Popup, Source } from 'react-map-gl'
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, LinearProgress, Collapse} from '@mui/material'
import Supercluster from 'supercluster'
import './map.css'
import GeocoderInput from '../sidebar/GeocoderInput'
// import PopupNeedHelpPoint from '../needHelpPoint/PopupNeedHelpPoint'
import { getRescueHubPoints } from '~/actions/rescueHubPoint'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import ErrorBoundary from './ErrorBoundary'
// import { HeightOutlined } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import PopupPoint from './PopupPoint'
import { DataGrid } from '@mui/x-data-grid'
import { getRegion } from '~/actions/regions'
import { useTheme } from '@emotion/react'
import moment from 'moment'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const row = [
  { id: 1, region: 'Hà Nội', needHelpPoint: 'Điểm A', resCueHubPoint: 'Trạm 1', evaluateLevel: 'Nặng', startTime: '2025-05-01', endTime: '2025-05-10' },
  { id: 2, region: 'Hải Phòng', needHelpPoint: 'Điểm B', resCueHubPoint: 'Trạm 2', evaluateLevel: 'Trung bình', startTime: '2025-05-02', endTime: '2025-05-11' },
  { id: 3, region: 'Quảng Ninh', needHelpPoint: 'Điểm C', resCueHubPoint: 'Trạm 3', evaluateLevel: 'Nhẹ', startTime: '2025-05-03', endTime: '2025-05-12' },
  { id: 4, region: 'Thái Bình', needHelpPoint: 'Điểm D', resCueHubPoint: 'Trạm 4', evaluateLevel: 'Nặng', startTime: '2025-05-04', endTime: '2025-05-13' },
  { id: 5, region: 'Nam Định', needHelpPoint: 'Điểm E', resCueHubPoint: 'Trạm 5', evaluateLevel: 'Trung bình', startTime: '2025-05-05', endTime: '2025-05-14' },
  { id: 6, region: 'Thái Nguyên', needHelpPoint: 'Điểm F', resCueHubPoint: 'Trạm 6', evaluateLevel: 'Nhẹ', startTime: '2025-05-06', endTime: '2025-05-15' },
  { id: 7, region: 'Vĩnh Phúc', needHelpPoint: 'Điểm G', resCueHubPoint: 'Trạm 7', evaluateLevel: 'Nặng', startTime: '2025-05-07', endTime: '2025-05-16' },
  { id: 8, region: 'Bắc Ninh', needHelpPoint: 'Điểm H', resCueHubPoint: 'Trạm 8', evaluateLevel: 'Trung bình', startTime: '2025-05-08', endTime: '2025-05-17' },
  { id: 9, region: 'Hưng Yên', needHelpPoint: 'Điểm I', resCueHubPoint: 'Trạm 9', evaluateLevel: 'Nhẹ', startTime: '2025-05-09', endTime: '2025-05-18' },
  { id: 10, region: 'Hà Nam', needHelpPoint: 'Điểm J', resCueHubPoint: 'Trạm 10', evaluateLevel: 'Nặng', startTime: '2025-05-10', endTime: '2025-05-19' }
]


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
  const [routeGeoJSON, setRouteGeoJSON] = useState(null)
  const [locationEnd, setLocationEnd] = useState(null)
  const [locationStart, setLocationStart] = useState(null)

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
  const [openForm, setOpenForm] = useState(false)

  const handleOpenForm = () => {
    setOpenForm(true) // Mở form khi nhấn vào 'Nhận hỗ trợ'
  }

  const handleCloseForm = () => {
    setOpenForm(false) // Đóng form
  }
  const location = useLocation()

  const showRoute = async (start, end) => {
    if (!start || !end) return
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
    )
    const data = await response.json()
    setRouteGeoJSON(data.routes[0].geometry)
    setLocationEnd(end)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const lat = parseFloat(searchParams.get('lat'))
    const lng = parseFloat(searchParams.get('lng'))
    const end_lat = parseFloat(searchParams.get('end_latitude'))
    const end_lng = parseFloat(searchParams.get('end_longitude'))

    const waitForMap = () => {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 10,
          speed: 1.2,
          curve: 1
        })

        if (end_lat && end_lng) {
          setLocationStart({ lng, lat })
          showRoute({
            lng, lat
          }, {
            lng: end_lng,
            lat: end_lat
          })
        }
      } else {
        requestAnimationFrame(waitForMap)
      }
    }

    if (lat && lng) {
      waitForMap()
    }
  }, [location])

  const theme = useTheme()
  const [regions, setRegions] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  // console.log(regions)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRegion()
      setRegions(result)
    }
    fetchData()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedRegions = regions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        {/* points */}
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
              key={`needHelpPoint-${cluster.properties._id}`}
              longitude={longitude}
              latitude={latitude}
              onClick={() => setPopupInfo(cluster.properties)}
              color={cluster.properties.type ==='need-help-point' ?'red':'blue'}

            />

          )
        })}
        {/* Bộ lọc địa chỉ */}
        <ErrorBoundary>
          <GeocoderInput />
        </ErrorBoundary>

        {/* điểm kết thúc */}
        {
          locationEnd && (
            <Marker key={`cluster-${locationEnd.lng}`} longitude={locationEnd.lng} latitude={locationEnd.lat} />
          )
        }
        {
          locationStart && (
            <Marker key={`cluster-${locationStart.lng}`} longitude={locationStart.lng} latitude={locationStart.lat} />
          )
        }

        {/* routing */}
        { routeGeoJSON && (
          <Source id='route' type='geojson' data={{ type: 'Feature', geometry: routeGeoJSON }} >
            <Layer id='route-layer' type='line' paint={{ 'line-color': 'blue', 'line-width': 4 }} />
          </Source>
        )}

        {/* popup infor */}
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
        ariaLabel='Thao tác bản đồ'
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
                handleOpenForm() // Mở form khi nhấn 'Nhận hỗ trợ'
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
            bottom: 60, // nằm trên SpeedDial một chút
            right: 100,
            width: 1000,
            bgcolor: 'white',
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 4,
            p: 2,
            zIndex: 1300
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
              <strong style={{ fontSize: '24px', color: '#1976d2' }}>
                Những vùng bị thiệt hại
              </strong>
            </Box>
            <span
              onClick={handleCloseForm}
              style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: 18 }}
            >
              ×
            </span>
            {/* Bảng dữ liệu test */}
          </Box>
          {/* Nội dung form bạn muốn */}
          <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableRow>
                    <TableCell />
                    <TableCell sx={{ color: 'white' }} align="center">Tên vùng</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">Điểm cần cứu trợ</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">Điểm cứu trợ</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">Mức độ thiệt hại</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">Cập nhật lần cuối</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">Thời gian</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">Thời gian hết hạn</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRegions.map((region) => (
                    <Row key={region.code} row={region} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={regions.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50]}
              labelRowsPerPage="Số dòng mỗi trang:"
            />
          </Paper>
        </Box>
      )}

    </Box>
  )
}

export default Maps

function Row({ row }) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  // Tính điểm thiệt hại tổng (ví dụ: trung bình cộng level của các tiêu chí)
  const totalLevel = row.criteria.reduce((sum, c) => sum + c.level, 0)
  const averageLevel = totalLevel / row.criteria.length
  const percent = (averageLevel / 10) * 100
  const updatedAt = row.updatedAt

  const getColor = (value) => {
    if (value <= 2) return '#4caf50'
    if (value <= 4) return '#ffc107'
    if (value <= 6) return '#ff9800'
    if (value <= 8) return '#f44336'
    return '#b71c1c'
  }

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              transition: 'transform 0.3s',
              transform: open ? 'rotate(180deg)' : 'none'
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align="center">{row.needHelpPointCount}</TableCell>
        <TableCell align="center">{row.rescueHubPointCount}</TableCell>
        <TableCell align="center">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{
                height: 6,
                borderRadius: 3,
                flexGrow: 1,
                backgroundColor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  backgroundColor: getColor(averageLevel)
                }
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {averageLevel.toFixed(1)}/10
            </Typography>
          </Box>
        </TableCell>
        <TableCell>{row.updatedBy?.name || '-'}</TableCell>
        <TableCell>{moment(updatedAt).format('HH:mm DD/MM/YYYY')}</TableCell>
        <TableCell>{moment(row.expiredAt).format('HH:mm DD/MM/YYYY')}</TableCell>
      </TableRow>

      {/* Chi tiết đánh giá */}
      <TableRow>
        <TableCell colSpan={8} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1.5 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ fontWeight: 400, fontSize: '0.9rem' }}
              >
                Chi tiết đánh giá
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 1.5,
                  mt: 1
                }}
              >
                {row.criteria.map((c, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 1.5,
                      borderLeft: `3px solid ${getColor(c.level)}`,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 1.5,
                      boxShadow: theme.shadows[1],
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: 60
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      {c.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
                      {c.level}/10
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </>
  )
}