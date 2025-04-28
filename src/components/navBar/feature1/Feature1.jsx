import React from 'react'
import { Box, Button, Menu, MenuItem, ListItemText, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Feature1 = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [menuIndex, setMenuIndex] = React.useState(null)
  const closeTimeout = React.useRef(null)

  const menuData = [
    {
      title: 'Ủng hộ',
      items: [
        { label: 'Điểm cứu trợ', path: '/needhelppoint' },
        { label: 'Chương trình cứu trợ', path: '/relief-program' },
        { label: 'Đồng hành', path: '/partner' },
        { label: 'Tình nguyện viên', path: '/volunteers' }
      ]
    },
    {
      title: 'Khám phá',
      items: [
        { label: 'Bản đồ thiện nguyện', path: '/map' },
        { label: 'Sự kiện thiện nguyện', path: '/events' },
        { label: 'Bản tin', path: '/newsletters' },
        { label: 'Tin tức', path: '/news' }
      ]
    },
    {
      title: 'Giới thiệu',
      items: [
        { label: 'Tầm nhìn', path: '/about/vision' },
        { label: 'Sứ mệnh', path: '/about/mission' },
        { label: 'Câu chuyện', path: '/about/story' },
        { label: 'Đội ngũ', path: '/about/team' }
      ]
    },
    {
      title: 'Liên hệ',
      items: [
        { label: 'Gửi phản hồi', path: '/contact/feedback' },
        { label: 'Thông tin liên lạc', path: '/contact/info' },
        { label: 'Hỗ trợ', path: '/contact/support' },
        { label: 'FAQ', path: '/contact/faq' }
      ]
    }
  ]

  const handleMouseEnter = (event, index) => {
    clearTimeout(closeTimeout.current)
    setAnchorEl(event.currentTarget)
    setMenuIndex(index)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setAnchorEl(null)
      setMenuIndex(null)
    }, 200)
  }

  return (
    <Box sx={{ display: 'flex', paddingLeft: '220px', gap: '40px' }}>
      {menuData.map((menu, index) => (
        <Box
          key={index}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: 'relative', // Để điều chỉnh các thành phần sau này
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Button
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            sx={{
              color: 'white',
              borderRadius: 2,

              textTransform: 'none',
              fontSize: '18px',
              fontWeight: 600, // Đậm để gây ấn tượng hơn
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between', // Căn chỉnh giữa tiêu đề và biểu tượng
              width: '120px',
              height: '45px',
              backgroundColor: 'transparent',
              border: '2px solid transparent', // Viền trong suốt
              transition: 'all 0.3s ease', // Hiệu ứng chuyển động mượt mà
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Thêm hiệu ứng hover
                color: theme => theme.palette.primary.main, // Màu khi hover
                borderColor: theme => theme.palette.primary.main, // Viền đổi màu khi hover
                boxShadow: '0px 4px 15px rgba(0, 127, 255, 0.5)', // Thêm bóng mờ khi hover
                transform: 'scale(1.05)' // Phóng to nhẹ khi hover
              },
              '&:active': {
                backgroundColor: theme => theme.palette.primary.light // Màu nền khi nhấn
              }
            }}
          >
            <Typography>{menu.title}</Typography>
            {menuIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && menuIndex === index}
            onClose={handleMouseLeave}
            MenuListProps={{
              onMouseEnter: () => clearTimeout(closeTimeout.current),
              onMouseLeave: handleMouseLeave
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            sx={{

              '& .MuiMenu-paper': {
                padding: 0, // Loại bỏ padding mặc định của paper
                margin: 0, // Loại bỏ margin mặc định của paper
                boxShadow: 'none', // Loại bỏ bóng mờ mặc định
                borderRadius: '10px' // Thêm bo tròn cho giấy menu nếu cần
              },
              '& .MuiMenuItem-root': {
                padding: '10px 20px', // Tùy chỉnh padding của MenuItem
                fontSize: '16px', // Kích thước chữ của item
                fontWeight: 500, // Chữ đậm vừa phải
                color: '#333', // Màu chữ
                transition: 'all 0.2s ease', // Thêm hiệu ứng chuyển động
                '&:hover': {
                  backgroundColor: 'rgba(0, 127, 255, 0.1)', // Màu nền khi hover
                  color: theme => theme.palette.primary.main // Màu chữ khi hover
                }
              }
            }}
          >
            {menu.items.map((item, idx) => (
              <MenuItem key={idx} component={Link} to={item.path}>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>

        </Box>
      ))}
    </Box>

  )
}

export default Feature1
