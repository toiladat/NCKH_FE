// Mission.jsx
import React, { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Mission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fdfcfb',
        overflowY: 'auto',
        pt: 2,
      }}
    >
      {/* Ảnh đầu trang */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1588776814546-ec7e174b99da"
        alt="Charity"
        sx={{
          width: '100%',
          maxHeight: '300px',
          objectFit: 'cover',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
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
          Hành Trình Lan Tỏa Yêu Thương
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.8 }} data-aos="fade-up">
          Tại nơi phố thị ồn ào, có những mảnh đời vẫn còn khó khăn cần được giúp đỡ. 
          Chúng tôi - nhóm thiện nguyện “Trái Tim Nhân Ái” đã bắt đầu hành trình của mình từ những điều nhỏ bé nhất. 
          Mỗi chuyến đi, mỗi món quà, là một tia hy vọng được thắp lên trong tim của những người đang sống trong nghịch cảnh.
        </Typography>

        <Typography
          variant="body1"
          sx={{ mt: 3, lineHeight: 1.8 }}
          data-aos="fade-up"
        >
          Không chỉ là trao đi vật chất, mà là trao đi niềm tin vào một tương lai tốt đẹp hơn. 
          Cùng nhau, chúng ta có thể làm được điều kỳ diệu — bởi một bàn tay trao đi, là một bàn tay hy vọng đang lớn dần lên mỗi ngày.
        </Typography>

        <Typography
          variant="body1"
          sx={{ mt: 3, lineHeight: 1.8 }}
          data-aos="fade-up"
        >
          Nếu bạn cũng tin vào lòng nhân ái, hãy gia nhập cùng chúng tôi. Hành trình yêu thương luôn cần những trái tim biết sẻ chia.
        </Typography>
      </Container>
    </Box>
  );
};

export default Mission;
