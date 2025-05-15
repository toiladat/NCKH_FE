// Mission.jsx
import { useEffect } from 'react'
import { Box, Typography, Container } from '@mui/material'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Mission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // thời gian hiệu ứng dài hơn chút
      easing: 'ease-in-out', // hiệu ứng chuyển động mượt mà
      once: true,
      delay: 100// delay mặc định, có thể tùy chỉnh cho từng phần tử
    })
  }, [])


  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fdfcfb',
        overflowY: 'auto',
        pt: 0
      }}
    >
      {/* Ảnh đầu trang */}
      <Box
        component="img"
        src="src/components/contentDashboard/anh/mission.jpeg"
        alt="Charity"
        data-aos="fade-up"
        sx={{
          width: '100%',
          maxHeight: '450px',
          objectFit: 'cover',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16
        }}
      />

      {/* Nội dung */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          data-aos="fade-up"
        >
          Hành Trình Yêu Thương Sau Cơn Bão
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.8 }} data-aos="fade-up">
          Mỗi năm, khi mùa mưa bão về, miền Trung lại phải đối mặt với những trận thiên tai nghiệt ngã, mang theo nước lũ nhấn chìm ruộng đồng, cuốn trôi tài sản và làm đứt gãy nhiều cuộc đời.
          Những mái nhà xiêu vẹo, những con đường ngập sâu, và ánh mắt thất thần của người dân sau bão là những hình ảnh khó phai trong tâm trí chúng tôi.
        </Typography>

        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }} data-aos="fade-up">
          Nhóm thiện nguyện <strong>“Trái Tim Nhân Ái”</strong> đã khởi động ngay những chiến dịch cứu trợ, kêu gọi sự chung tay của cộng đồng để nhanh chóng đến với những vùng chịu thiệt hại nặng nề nhất.
          Không có quỹ lớn, không có phương tiện hiện đại, chúng tôi chỉ có lòng nhiệt huyết và trái tim biết đồng cảm, sẵn sàng vượt qua những chặng đường khó khăn để mang yêu thương đến từng nhà.
        </Typography>

        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }} data-aos="fade-up">
          Đôi khi, chúng tôi phải đi qua những con đường sạt lở, lội qua những đoạn nước sâu đến ngang hông, chở trên xe những thùng quà, những bao gạo, chai nước sạch và chăn ấm để kịp thời trao gửi cho bà con.
          Không ít lần, ánh mắt của những em nhỏ chạy ra đón nhận từng món quà khiến lòng chúng tôi nghẹn ngào — họ không cần nhiều, chỉ cần được biết vẫn có người quan tâm, vẫn có hy vọng ấm áp trong cơn giông bão.
        </Typography>

        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }} data-aos="fade-up">
          Hành trình thiện nguyện của chúng tôi không chỉ dừng lại ở việc cứu trợ tức thời. Chúng tôi mong muốn xây dựng những chương trình bền vững như sửa chữa nhà cửa, mở lớp học tình thương cho các em nhỏ vùng lũ,
          và hỗ trợ phát triển cộng đồng để người dân có thể vươn lên sau những mất mát đau thương.
        </Typography>

        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }} data-aos="fade-up">
          “Trái Tim Nhân Ái” không chỉ là một nhóm nhỏ, mà là một cộng đồng gắn kết bởi niềm tin và tình yêu thương. Chúng tôi tin rằng mỗi hành động dù nhỏ bé cũng có thể tạo nên những thay đổi lớn lao.
          Và khi mỗi người trong chúng ta mở lòng, thì cơn bão cuộc đời cũng sẽ không còn đáng sợ nữa.
        </Typography>

        <Typography
          variant="body1"
          sx={{ mt: 3, lineHeight: 1.8, fontWeight: 'bold' }}
          data-aos="fade-up"
        >
          Nếu bạn cũng muốn cùng chúng tôi góp sức, hãy tham gia vào hành trình này. Bởi chỉ cần một phần quà nhỏ, một lời chia sẻ chân thành, chúng ta đã cùng nhau thắp lên ngọn lửa hy vọng, soi sáng cho những ngày tươi sáng hơn của miền Trung thân yêu.
        </Typography>

      </Container>

    </Box>
  )
}

export default Mission
