import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import moment from 'moment'
import { useTheme } from '@mui/material/styles'

import LinearProgress from '@mui/material/LinearProgress'

import { useEffect, useState } from 'react'
import { getRegion } from '~/actions/regions'
import { TablePagination } from '@mui/material'


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
                height: 8,
                borderRadius: 4,
                flexGrow: 1,
                backgroundColor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  backgroundColor: getColor(averageLevel)
                }
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {averageLevel.toFixed(1)}/10
            </Typography>
          </Box>
        </TableCell>
        <TableCell>{row.updatedBy?.name ||'-'}</TableCell>
        <TableCell>{moment(updatedAt).format('HH:mm DD/MM/YYYY')}</TableCell>
        <TableCell>{moment(row.expiredAt).format('HH:mm DD/MM/YYYY')}</TableCell>

      </TableRow>

      {/* Chi tiết (tùy chọn) */}
      <TableRow>
        <TableCell colSpan={8} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Chi tiết đánh giá
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 2,
                  mt: 1
                }}
              >
                {row.criteria.map((c, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      borderLeft: `4px solid ${getColor(c.level)}`,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 2,
                      boxShadow: theme.shadows[1],
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: 80
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      {c.name}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
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

export default function Regions() {
  const theme = useTheme()
  const [regions, setRegions] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
console.log(regions);

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
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ bgcolor: theme.palette.background.default }}>
            <TableRow>
              <TableCell />
              <TableCell>Tên vùng</TableCell>
              <TableCell align="right">Điểm cần cứu trợ</TableCell>
              <TableCell align="right">Điểm cứu trợ</TableCell>
              <TableCell align="center">Mức độ thiệt hại</TableCell>
              <TableCell>Cập nhật lần cuối</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Thời gian hết hạn</TableCell>

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
  )
}