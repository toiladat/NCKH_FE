import { Avatar, Box, Tab, Tabs, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFullUsers, updateUser } from '~/actions/admin'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

const Users = () => {
  const { admin, users } = useSelector(state => state.adminReducer)
  const dispatch = useDispatch()

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [value, setValue] = useState(0)

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
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Cơ quan chức năng', 'Người dùng thường', 'Tình nguyện viên'],
      editable: true
    },
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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleRowUpdate = (newRow, oldRow) => {
    const updatedFields = {}

    if (newRow.status !== oldRow.status) {
      updatedFields.status = newRow.status
    }

    if (newRow.role !== oldRow.role) {
      updatedFields.role = newRow.role
    }

    if (Object.keys(updatedFields).length > 0) {
      const data = {
        id: newRow._id,
        ...updatedFields
      }
      updateUser(admin, dispatch, data)
    }

    return newRow
  }

  const handleUpdateError = (error) => {
    console.error('❌ Lỗi khi cập nhật:', error)
  }

  const renderGrid = (filteredUsers) => (
    <Box sx={{ height: 400, mt: 2 }}>
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={handleUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h3' component='h3' sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
        Quản lý Người Dùng
      </Typography>

      <Tabs value={value} onChange={handleChange} aria-label="tabs">
        <Tab label="Tất cả người dùng" />
        <Tab label="Người dùng thường" />
        <Tab label="Cơ quan chức năng" />
        <Tab label="Tình nguyện viên" />
      </Tabs>

      <TabPanel value={value} index={0}>
        {renderGrid(users.usersData)}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {renderGrid(users.usersData.filter(u => u.role === 'Người dùng thường'))}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {renderGrid(users.usersData.filter(u => u.role === 'Cơ quan chức năng'))}
      </TabPanel>

      <TabPanel value={value} index={3}>
        {renderGrid(users.usersData.filter(u => u.role === 'Tình nguyện viên'))}
      </TabPanel>
    </Box>
  )
}

export default Users
