import {Box, Container, Typography, Card, CardContent, CardMedia, Button } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination} from 'swiper/modules';
import "swiper/css/navigation";
import "swiper/css/pagination";
import './swiper.css';
import { useTheme } from '@mui/material/styles'; // import useTheme
import { useSelector,useDispatch } from "react-redux";
import { updateNeedHelpPoint } from "~/redux/actions/needHelpPoint";




const Middlecontent = () => {

    const {filteredNeedHelpPoints : filterdPoints } = useSelector (state => state.needHelpPointReducer)
    const theme = useTheme();
    const dispatch = useDispatch()
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
                {filterdPoints.map ((item, index) => (
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
                                image={item.images}
                                height="420px"
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

                            <Button size="medium" sx={{ m: 2, borderRadius: "10px" }} variant="contained" color="primary"
                                onClick={ () => {
                                    console.log("Button clicked!", item);
                                    dispatch(updateNeedHelpPoint(item))  }}
                            >
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