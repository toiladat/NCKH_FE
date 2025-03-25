import {Box, Container, Typography} from "@mui/material"

const Middlecontent = () => {
    return (
        <Container>
            <Typography variant="h3" align="center"
                sx={{
                    marginTop: 0,
                    paddingBottom: "20px",
                    fontWeight: "600",
                    fontSize: "40px",
                }}
            >
                Điểm đang cần được cứu trợ
            </Typography>

            <Typography align="center"
                sx={{
                    marginTop: 0,
                    paddingBottom: "20px",
                }}
            >
                Nhiều khu vực đang đối mặt với thiên tai và khó khăn. Hãy cùng chung tay giúp đỡ những người cần chúng ta ngay lúc này!
            </Typography>
        </Container>
    )
}

export default Middlecontent