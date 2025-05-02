import { Box, Container, Typography, keyframes } from '@mui/material'
import { useInView } from 'react-intersection-observer' // hook giúp phát hiện khi nào 1 phần tử nằm trong tầm nhìn của màn hình.
import { useTheme } from '@mui/material/styles' // import useTheme

// Định nghĩa keyframes cho hiệu ứng
const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`

const BottomMiddlecontent = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // cho phép trigger lại nhiều lần khi cuộn lên xuống
    threshold: 0.2 // chỉ cần 20% phần tử hiển thị là sẽ trigger
  })

  const theme = useTheme()
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #3152BF 0%, #ffffff 100%)',
        width: '100%',
        py: '50px',
        marginBottom: '100px',
        color: 'black'
      }}
      ref={ref} // gắn ref vào Box cha
    >
      <Container
        sx={{
          display: 'flex',
          gap: '70px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {/* Ảnh */}
        <Box
          component='img'
          src='src/components/contentDashboard/anh/anh3.jpg'
          alt=''
          sx={{
            maxWidth: '45%',
            height: 'auto',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            opacity: 0,
            animation: inView
              ? `${fadeInLeft} 1s ease-out forwards`
              : 'none'
          }}
        />

        <Box
          sx={{
            maxWidth: '500px',
            opacity: 0,
            animation: inView
              ? `${fadeInRight} 1s ease-out forwards`
              : 'none'
          }}
        >
          <Typography
            sx={{
              mb: '20px',
              fontSize: { xs: '32px', md: '45px' },
              fontWeight: '700',
              color: theme.customColors.darkBlue // dùng màu từ theme
            }}
          >
              HelpMap là gì?
          </Typography>

          <Typography
            sx={{
              mb: '15px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#5D5D5D',
              lineHeight: 1.7
            }}
          >
              HelpMap là một nền tảng trực tuyến hiện đại, hỗ trợ các hoạt động kết nối, gây quỹ và điều phối cứu trợ cộng đồng trong các tình huống thiên tai hoặc hoàn cảnh khó khăn.
          </Typography>

          <Typography
            sx={{
              mb: '15px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#5D5D5D',
              lineHeight: 1.7
            }}
          >
                        HelpMap kết nối nhà hảo tâm với các điểm cần cứu trợ qua bản đồ tương tác, giúp tìm kiếm và hỗ trợ nhanh chóng.
          </Typography>

          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#5D5D5D',
              lineHeight: 1.7
            }}
          >
              HelpMap giúp các tổ chức như Hội Chữ thập đỏ và các tổ chức thiện nguyện dễ dàng tổ chức cứu trợ, kết nối trực tiếp cộng đồng với các vùng thiên tai.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default BottomMiddlecontent

