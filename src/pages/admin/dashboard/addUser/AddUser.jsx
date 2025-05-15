import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '~/actions/admin'


const criteriaOptions = [
  { label: 'Tử vong / Mất tích', value: 'fatalities' },
  { label: 'Chấn thương nặng', value: 'injuries' },
  { label: 'Thiệt hại nhà ở', value: 'housingDamage' },
  { label: 'Nhu yếu phẩm (đồ ăn / nước sạch)', value: 'foodWater' },
  { label: 'Vật dụng y tế', value: 'medicalSupplies' },
  { label: 'Nhóm dễ tổn thương', value: 'vulnerableGroups' },
  { label: 'Khả năng tiếp cận (giao thông)', value: 'accessibility' },
  { label: 'Mức độ ngập lụt (m)', value: 'floodDepth' },
  { label: 'Tốc độ sạt lở (điểm/giờ)', value: 'landslideRate' },
  { label: 'Thiệt hại mùa màng / chăn nuôi', value: 'agriculturalLoss' },
  { label: 'Khả năng cảnh báo & sơ tán', value: 'evacuationCapacity' }
]
const roles = [
  'Người dùng thường',
  'Tình nguyện viên',
  'Cơ quan chức năng'
]

const AddUser = () => {
  const dispatch = useDispatch()

  const { admin } = useSelector(state => state.adminReducer)
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedCriteria, setSelectedCriteria] = useState([])
  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const email = data.get('email')
    const password = data.get('password')
    const name = data.get('name')
    const phone = data.get('phone')
    const address = data.get('address')

    const errors = {}

    if (!name) errors.name = 'Tên không được để trống'
    if (!email) errors.email = 'Email không được để trống'
    if (!password) errors.password = 'Mật khẩu không được để trống'

    const phoneRegex = /^0\d{9}$/
    if (!phone) {
      errors.phone = 'Số liên hệ không được để trống'
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'Số điện thoại phải bắt đầu bằng 0 và gồm 10 chữ số'
    }

    if (!selectedRole) errors.role = 'Vui lòng chọn quyền'

    if (selectedRole === 'Cơ quan chức năng' && selectedCriteria.length === 0) {
      errors.criteria = 'Vui lòng chọn ít nhất một tiêu chí'
    }

    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    const newUser = {
      email,
      password,
      name,
      phone,
      address,
      role: selectedRole,
      criteria: selectedRole === 'Cơ quan chức năng'
        ? selectedCriteria.map(item => item.value)
        : []
    }
    createUser(admin, dispatch, newUser)

    form.reset()
    setSelectedRole(null)
    setSelectedCriteria([])
    setFormErrors({})
  }

  return (
    <Box sx={{
      maxWidth: 600,
      height: '90vh',
      overflowY: 'auto',
      mx: 'auto',
      mt: 5,
      px: 2
    }}>
      <Typography variant="h4" align="center" gutterBottom>
        Thêm người dùng nâng cao
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Cá nhân/Tổ chức"
          name="name"
          error={!!formErrors.name}
          helperText={formErrors.name}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          error={!!formErrors.email}
          helperText={formErrors.email}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          error={!!formErrors.password}
          helperText={formErrors.password}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Số điện thoại"
          name="phone"
          error={!!formErrors.phone}
          helperText={formErrors.phone}
        />

        <TextField
          margin="normal"
          fullWidth
          id="address"
          label="Địa chỉ (tuỳ chọn)"
          name="address"
        />

        {/* Quyền */}
        <Autocomplete
          options={roles}
          getOptionLabel={(option) => option}
          value={selectedRole}
          onChange={(event, newValue) => {
            setSelectedRole(newValue)
            if (newValue !== 'Cơ quan chức năng') {
              setSelectedCriteria([])
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Quyền"
              placeholder="Chọn quyền"
              error={!!formErrors.role}
              helperText={formErrors.role}
            />
          )}
          sx={{ mt: 2 }}
        />

        {/* Tiêu chí - chỉ hiện khi là Cơ quan chức năng */}
        {selectedRole === 'Cơ quan chức năng' && (
          <Autocomplete
            multiple
            options={criteriaOptions}
            getOptionLabel={(option) => option.label}
            value={selectedCriteria}
            onChange={(event, newValue) => setSelectedCriteria(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tiêu chí quản lý"
                placeholder="Chọn tiêu chí"
                error={!!formErrors.criteria}
                helperText={formErrors.criteria}
              />
            )}
            sx={{ mt: 2 }}
          />
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Xác nhận
        </Button>
      </Box>
    </Box>
  )
}

export default AddUser
