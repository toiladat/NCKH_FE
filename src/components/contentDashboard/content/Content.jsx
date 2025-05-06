import { Box, Typography, Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight' // Import icon
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'


const Content = () => {

  const theme = useTheme()

  return (
    <Box sx={{ width: '100vw', height: '85vh', overflow: 'hidden', textAlign: 'center', background: 'linear-gradient(135deg, #3152BF 0%, #ffffff 100%)', marginBottom: '80px' }}>

      <Typography variant='h2' component='h2' sx={{
        mt: 2,
        position: 'absolute',
        top: '20%',
        left: '50%',
        fontWeight: '600',
        fontSize: '50px',
        margin: '35px',
        padding: '20px',
        // fontFamily: ''Poppins', sans-serif',
        color: theme.customColors.darkBlue,
        textShadow: '4px 4px 6px rgba(0,0,0, 0.4)'

      }}>
            Chào mừng bạn đến với HelpMap – nơi kết nối những tấm lòng nhân ái!
      </Typography>

      <Typography sx={{
        mt: 2,
        position: 'absolute',
        top: '45%',
        left: '50%',
        fontWeight: '200',
        fontSize: '16px',
        margin: '35px',
        padding: '20px',
        // fontFamily: ''Poppins', sans-serif',
        fontStyle: 'italic',
        color: theme.customColors.darkBlue

      }}>
            “Mỗi điểm đánh dấu trên HelpMap không chỉ là một địa điểm, mà còn là một câu chuyện, một hy vọng, và một cơ hội để chúng ta cùng nhau lan tỏa lòng nhân ái.”
      </Typography>

      <Button
        component = {Link}
        to = '/maps'
        sx={{
          backgroundColor: theme.customColors.darkBlue,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: theme.customColors.Primary, // Giữ nguyên màu nền khi hover
            color: '#ffffff' // Giữ nguyên màu chữ khi hover
          },
          display: 'flex',
          position: 'absolute',
          top: '63%',
          left: '60%',
          padding: '10px',
          borderRadius: '10px',
          width: '170px',
          height: '50px'

        }}
        endIcon={<ChevronRightIcon />}
      >
      Khám phá ngay
      </Button>

      <Button
        sx={{
          backgroundColor: theme.customColors.darkBlue,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: theme.customColors.Primary,
            color: '#ffffff' // Giữ nguyên màu chữ khi hover
          },
          display: 'flex',
          position: 'absolute',
          top: '63%',
          left: '78%',
          padding: '12px',
          borderRadius: '10px',
          width: '170px',
          height: '50px'

        }}
      >
      Liên hệ
      </Button>
    </Box>
  )
}
export default Content