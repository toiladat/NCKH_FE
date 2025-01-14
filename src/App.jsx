import NavBar from './components/NavBar'
import Notification from './components/Notification'
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
      </ContextProvider>
    </>
  )
}

export default App
