import ClusterMap from './map/ClusterMap'
import Content from './content/Content'
import { Box, Container } from '@mui/material'
import Middlecontent from './Middlecontent/Middlecontent'
import BottomMiddlecontent from './BottomMiddlecontent/BottomMiddlecontent'
import Footer from './Footer/Footer'
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

      <Footer/>

    </>
  )
}
export default ContentDashboard