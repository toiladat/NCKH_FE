import { updateLocationRescueStart, updateLocationRescueEnd } from '~/redux/actions/rescueHubPoint'
import { updateLocation } from '~/redux/actions/needHelpPoint'
import { updateEvaluatedPoint } from '~/redux/actions/evaluatedPoint'

const getActionByType = (type, payload) => {
  switch (type) {
  case 'rescue-hub-start':
    return updateLocationRescueStart(payload)
  case 'rescue-hub-end':
    return updateLocationRescueEnd(payload)
  case 'need-help-point':
    return updateLocation(payload)
  case 'evaluated-point':
    return updateEvaluatedPoint(payload)
  default:
    return null
  }
}

// Giữ timer debounce cho mỗi type riêng biệt
const debounceTimers = {}

const handleUpdateSite = (
  dispatch,
  updateAlert,
  setMarkerKey,
  type,
  lngLat,
  delay = 500
) => {
  // nếu có timer cũ, clear nó
  if (debounceTimers[type]) {
    clearTimeout(debounceTimers[type])
  }

  // đặt timer mới
  debounceTimers[type] = setTimeout(() => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const feature = data.features[0]
        if (!feature) {
          dispatch(updateAlert({
            open: true,
            severity: 'warning',
            message: 'Không tìm thấy vị trí'
          }))
          if (setMarkerKey) setMarkerKey(prev => prev + 1)
          return
        }

        const parts = feature.place_name.split(',')
        const address = parts[parts.length - 2]?.trim() || ''

        const context = feature.context || []
        const countryContext = context.find(c => c.id.startsWith('country.'))
        const countryName = countryContext?.text?.trim() || ''

        if (countryName === 'Vietnam') {
          const payload = { lng: lngLat.lng, lat: lngLat.lat, address }
          const action = getActionByType(type, payload)
          if (action) dispatch(action)
        } else {
          dispatch(updateAlert({
            open: true,
            severity: 'warning',
            message: 'Không thuộc địa phận Việt Nam'
          }))
          if (setMarkerKey) setMarkerKey(prev => prev + 1)
        }
      })
      .catch(() => {
        dispatch(updateAlert({
          open: true,
          severity: 'error',
          message: 'Lỗi lấy dữ liệu vị trí'
        }))
        if (setMarkerKey) setMarkerKey(prev => prev + 1)
      })
    // xóa timer sau khi chạy xong
    delete debounceTimers[type]
  }, delay)
}

export default handleUpdateSite
