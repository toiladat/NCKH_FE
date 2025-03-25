import ClusterMap from "./map/ClusterMap"
import Content from './content/Content'
import { Box, Container } from "@mui/material"
import Middlecontent from "./Middlecontent/Middlecontent"
const ContentDashboard = () => {
    return (
    <>
    <Box
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            overFlow:'hidden',
        }}
    >
        <ClusterMap/>
        <Content/>
       
    </Box>

    <Container>
        <Middlecontent/>
    </Container>
    </>
    
    )
}
export default ContentDashboard