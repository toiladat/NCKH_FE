import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar'
import BoardBar from './MapBar'
import MapContent from './MapContent'
function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar/>
      <MapContent/>
    </Container>
  )
}

export default Board
