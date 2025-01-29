import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Room from './components/rooms/Room'
import BottomNav from './components/user/BottomNav'
import Loading from './components/user/Loading'
import Login from './components/user/Login'
import ContextProvider from './context/ContextProvider'

function App() {
  return (
    <>
      <ContextProvider>
        <Loading/>
        <Notification/>
        <NavBar/>
        <Login/>
        <BottomNav/>
        <Room/>
      </ContextProvider>
    </>
  )
}

export default App
