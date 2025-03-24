import {Box, Container, Typography, Card, CardContent, CardMedia, Button } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination} from 'swiper/modules';
import "swiper/css/navigation";
import "swiper/css/pagination";
import './swiper.css'
import { useTheme } from "@mui/material/styles";


const data = [
    { title: "Hà Giang", description: "Mưa lũ cần cứu trợ khẩn cấp.", image: "https://cdn-images.vtv.vn/zoom/640_400/66349b6076cb4dee98746cf1/2024/09/11/lao-2-76814329654991654407173-53934399676490566481715.jpg" },
    { title: "Nghệ An", description: "Ngập lụt nghiêm trọng.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhPTOf9zZ-xdbzsKZkJ6I048ylLyUw9oD_EQ&s" },
    { title: "Quảng Trị", description: "Bão lũ làm mất điện diện rộng.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRga1LXAb2adXpFWf-pv-Fa2b0__EixWj8xNA&s" },
    { title: "Yên Bái", description: "Sạt lở cô lập bản làng.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP4BLyNLCsoQpv1Rh5_ihqGCWJkww5pvAgDr4CxcfcSULJ-HdAJSWE0whH2UqP6UTs7Rw&usqp=CAU" },
    { title: "Thanh Hóa", description: "Ruộng đồng ngập sâu.", image: "https://files.ubdt.gov.vn/ContentFolder/ecm/source_files/2017/08/27/20205978_vov_lu_quet_o_mu_cang_chai_fnqa_17-08-27.jpg" },
];
const Middlecontent = () => {
    
    const theme = useTheme();
    return (
        <Container sx={{ pb: "50px", position: "relative", overflow: "visible" }}>
            <Typography variant="h3" align="center"
                sx={{
                    marginTop: 0,
                    paddingBottom: "20px",
                    fontWeight: "600",
                    fontSize: "40px",
                    color: theme.customColors.darkBlue,
                }}
            >
                Điểm đang cần được cứu trợ
            </Typography>

            <Typography align="center"
                sx={{
                    marginTop: 0,
                    paddingBottom: "40px",
                    fontWeight: '600',
                    color: "#5D5D5D",
                }}
            >
                Nhiều khu vực đang đối mặt với thiên tai và khó khăn. Hãy cùng chung tay giúp đỡ những người cần chúng ta ngay lúc này!
            </Typography>

            <Swiper
                spaceBetween={20} 
                slidesPerView={3} 
                modules={[Navigation, Pagination]} 
                navigation
                pagination={{clickable: true}}
                grabCursor={true}
                loop={true} // lặp vô hạn
                speed={700}
                style={{ paddingBottom: "30px" }}
                className="custom-swiper"

            >
                {data.map ((item, index) => (
                    <SwiperSlide key={index}>
                        <Card 
                            sx={{
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
                                height: "100%",
                                transition: "0.4s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
                                },
                                display: "flex",
                                flexDirection: "column", // phần tử được sắp xếp theo chiều doc
                                // background: "#E0DFE0",
                            }}
                        >
                            <CardMedia
                                component= "img"
                                image={item.image}
                                height="320px"
                                alt={item.title}
                                sx={{ 
                                    objectFit: "cover",
                                    
                                 }}
            
                            />

                            <CardContent sx={{ 
                                flexGrow: 1, }}>
                                <Typography gutterBottom variant="h6" fontWeight="700">{item.title}</Typography>

                                <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                            </CardContent>

                            <Button size="medium" sx={{ m: 2, borderRadius: "10px" }} variant="contained" color="primary">
                                Xem chi tiết
                            </Button>

                        </Card>
                    </SwiperSlide>
                ))}
                
            </Swiper>
        </Container>
    )
}

export default Middlecontent