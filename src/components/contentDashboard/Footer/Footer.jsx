import { Box, Typography, Link, IconButton, TextField, Button, List, ListItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Container } from '@mui/system'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'


const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.customColors.Primary,
        height: '514px',
        borderRadius: '50px 50px 0 0',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}
    >

      <Container
        sx={{
          height: '136px',
          backgroundColor: theme.customColors.darkBlue,
          position: 'absolute',
          bottom: '300px',
          borderRadius: '16px',
          color: '#ffffff'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '30px'
          }}
        >
          <Box
            sx={{
              width: '30%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h2>Đăng ký để bạn có thể ủng hộ những hoàn cảnh khó khăn</h2>
          </Box>
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              display: 'flex',
              height: '70px',
              marginTop: '30px'
            }}
          >
            <TextField
              id='email-input'
              label='Nhập email của bạn'
              variant='outlined'
              fullWidth
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                margin: '8px',
                flex: 1
              }}
            />

            <Button
              sx={{
                backgroundColor: theme.customColors.darkBlue,
                margin: '10px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '8px'
              }}
            >
                            Đăng ký ngay
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '40px'
          }}
        >
          <List sx={{ color: '#ffffff', display: 'flex', gap: '20px', fontSize: '15px', width: '40%', fontWeight: '500' }}>
            <ListItem disablePadding>
              <Link href='#' underline='none' color='inherit'>Trang Chủ</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href='#' underline='none' color='inherit'>Danh Mục</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href='#' underline='none' color='inherit'>Giới Thiệu</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href='#' underline='none' color='inherit'>Liên hệ</Link>
            </ListItem>
          </List>


          <List sx={{ color: '#ffffff', display: 'flex', gap: '50px', width: '25%' }}>
            <ListItem disablePadding>
              <IconButton color='inherit'>
                <FacebookIcon/>
              </IconButton>
            </ListItem>
            <ListItem disablePadding>
              <IconButton color='inherit'>
                <TwitterIcon/>
              </IconButton>
            </ListItem>
            <ListItem disablePadding>
              <IconButton color='inherit'>
                <InstagramIcon/>
              </IconButton>
            </ListItem>
            <ListItem disablePadding>
              <IconButton color='inherit'>
                <YouTubeIcon/>
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            borderBottom: '0.5px solid #ffffff',
            width: '100%',
            margin: '20px 0'
          }}
        />

        <Box
          sx={{
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              color: '#AAAAAA',
              fontSize: '15px',
              fontWeight: '550'
            }}
          >@ 2025 - Nghiên cứu khoa học</Typography>

          <Typography
            sx={{
              color: '#ffffff',
              fontSize: '40px',
              fontWeight: '550',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Link href='#' underline='none' color='#ffffff'> HelpMap </Link>
          </Typography>

          <Box
            sx={{
              color: '#AAAAAA',
              fontSize: '15px',
              fontWeight: '550',
              display: 'flex',
              gap: '35px'
            }}
          >
            <Typography>Điều khoản</Typography>
            <Typography>Chính sách bảo mật</Typography>
          </Box>
        </Box>

      </Container>
    </Box>
  )
}

export default Footer

