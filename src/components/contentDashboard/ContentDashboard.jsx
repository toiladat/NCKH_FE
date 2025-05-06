import ClusterMap from './map/ClusterMap'
import Content from './content/Content'
import { Box, Container } from '@mui/material'
import Middlecontent from './Middlecontent/Middlecontent'
import BottomMiddlecontent from './BottomMiddlecontent/BottomMiddlecontent'
import Footer from './Footer/Footer'
import ContentRescueHub from './ContentRescueHub/ContentRescueHub'
const ContentDashboard = () => {
  return (
    <>
      <Box
        sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          overFlow:'hidden'
        }}
      >
        <ClusterMap/>
        <Content/>
      </Box>

      <Container>
        <Middlecontent/>
      </Container>

      <BottomMiddlecontent/>

      <ContentRescueHub/>

      <Footer/>

    </>
  )
}
export default ContentDashboard