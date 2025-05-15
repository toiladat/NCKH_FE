import React, { useEffect, useState } from 'react'
import { Group, MapsHomeWork } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  Pagination
} from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getFullAdmins, getFullNeedHelpPoints, getFullRescueHubPoints, getFullUsers } from '~/actions/admin'
import PiePoints from './PiePoints'
import LineChartPoints from './LineChartPoints'

const StatCard = ({ icon: Icon, label, value, gradientColor }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      textAlign: 'center',
      background: `linear-gradient(135deg, ${alpha(gradientColor, 0.2)}, transparent)`
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
      <Icon sx={{ fontSize: 40, opacity: 0.3, mr: 1 }} />
      <Typography variant='h6' sx={{ fontWeight: 600, color: gradientColor }}>
        {label}
      </Typography>
    </Box>
    <Typography variant='h3' sx={{ fontWeight: 700, color: gradientColor }}>
      {value}
    </Typography>
  </Paper>
)

const PaginatedList = ({ title, data, borderColor, itemsPerPage = 10 }) => {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(data.length / itemsPerPage)
  const handleChange = (e, value) => setPage(value)

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const pageData = data.slice(start, end)

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <List dense>
          {pageData.map((item, i) => (
            <Box key={item._id}>
              <ListItem sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    src={item.photoURL}
                    sx={{ border: `2px solid ${borderColor}` }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <>
                      <Typography variant='body2' color='text.secondary'>
                        Quyền: {item.role}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Ngày tạo: {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {i < pageData.length - 1 && <Divider variant='inset' />}
            </Box>
          ))}
        </List>
      </Box>
      {pageCount > 1 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            size='small'
          />
        </Box>
      )}
    </Paper>
  )
}

export default function Main() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { admin, admins, users, rescueHubPoints, needHelpPoints } = useSelector(
    state => state.adminReducer
  )

  useEffect( () => {
    if (admins.length === 0) getFullAdmins(admin, dispatch)
    if (users.usersData.length === 0) getFullUsers(admin, dispatch)
    if (rescueHubPoints.pointsData.length === 0) getFullRescueHubPoints(admin, dispatch)
    if (needHelpPoints.pointsData.length === 0) getFullNeedHelpPoints(admin, dispatch)

  },[])
  // Chart colors from theme
  const chartColors = [theme.palette.primary.main, theme.palette.secondary.main]

  const stats = [
    {
      icon: Group,
      label: 'TỔNG NGƯỜI DÙNG',
      value: users.usersData.length,
      gradientColor: theme.palette.primary.main
    },
    {
      icon: MapsHomeWork,
      label: 'ĐIỂM CẦN CỨU TRỢ',
      value: needHelpPoints.pointsData.length,
      gradientColor: theme.palette.error.main
    },
    {
      icon: MapsHomeWork,
      label: 'ĐIỂM CỨU TRỢ',
      value: rescueHubPoints.pointsData.length,
      gradientColor: theme.palette.success.main
    }
  ]

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        p: 3,
        backgroundColor: theme.palette.background.default
      }}
    >
      {/* Stat Cards */}
      {stats.map((s, i) => (
        <StatCard
          key={i}
          icon={s.icon}
          label={s.label}
          value={s.value}
          gradientColor={s.gradientColor}
        />
      ))}

      {/* Người dùng cấp cao */}
      {/* <Box sx={{ gridColumn: '3 / 4', gridRow: '1 / span 2' }}>
        <PaginatedList
          title='👔 Người dùng cấp cao'
          data={admins}
          borderColor={theme.palette.primary.main}
        />
      </Box> */}

      {/* Người dùng thường */}
      <Box sx={{ gridColumn: '3 / 4', gridRow: '2 / span 2' }}>
        <PaginatedList
          title='🙋 Người dùng cấp cao'
          data={users.usersData.filter(user => user.role !== 'Người dùng thường')}
          borderColor={theme.palette.secondary.main}
        />
      </Box>

      {/* Pie Chart */}
      <Paper
        elevation={3}
        sx={{ p: 3, gridColumn: '1 / span 2', borderRadius: 4 }}
      >
        <Typography variant='h6' sx={{ fontWeight: 500 }}>
          PHÂN BỐ ĐIỂM
        </Typography>
        <PiePoints
          statistic={[
            { name: 'Cần cứu trợ', value: needHelpPoints.pointsData.length },
            { name: 'Điểm cứu trợ', value: rescueHubPoints.pointsData.length }
          ]}
          colors={chartColors}
        />
      </Paper>

      {/* Line Chart */}
      <Paper
        elevation={3}
        sx={{ p: 3, gridColumn: '1 / span 2', borderRadius: 4 }}
      >
        <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
          DÒNG THỜI GIAN ĐIỂM
        </Typography>
        <LineChartPoints colors={chartColors} />
      </Paper>
    </Box>
  )
}
