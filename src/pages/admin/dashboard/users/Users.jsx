import { Avatar, Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFullUsers } from '~/actions/admin'

const Users = () => {
  const { admin, users } = useSelector(state => state.adminReducer)
  const dispatch = useDispatch()

  // State quản lý trang và số lượng user hiển thị trên 1 trang
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    getFullUsers(admin, dispatch, page + 1, pageSize)
  }, [page, pageSize])

  const columns = useMemo(() => [
    {
      field: 'photoURL',
      headerName: 'Avatar',
      flex: 0.3,
      renderCell: param => <Avatar sx={{ mt: 0.5 }} src={param.row.photoURL} />,
      sortable: false,
      filterable: false
    },
    { field: 'name', headerName: 'Name', flex: 0.7 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      type: 'singleSelect',
      valueOptions: ['active', 'inactive', 'banned'],
      editable: true
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: param => moment(param.row.createdAt).format('YYYY-MM-DD')
    }
  ], [])

  return (
    <Box sx={{ height: 400, width: '80%', pl: 20 }}>
      <Typography variant='h3' component='h3' sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
        Quản lý Người Dùng
      </Typography>

      <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
        Trang {page + 1} / {Math.ceil(users.userTotal / pageSize)}
      </Typography>

      <DataGrid
        columns={columns}
        rows={users.usersData}
        getRowId={row => row._id}
        paginationMode="server" // Bật phân trang từ backend
        rowCount={users.userTotal} // Tổng số user từ backend
        pageSize={pageSize} // Số user trên mỗi trang
        page={page} // Trang hiện tại
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Box>
  )
}

export default Users
