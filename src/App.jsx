import NavBar from './components/NavBar'
import Notification from './components/Notification'
import NeedHelpPoint from './components/needHelpPoint/NeedHelpPoint'
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
        <NeedHelpPoint/>
      </ContextProvider>
    </>
  )
}

export default App
