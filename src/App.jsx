import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Loading from './components/user/Loading'
import Login from './components/user/Login'
import ContextProvider from './context/ContextProvider'
import Board from './pages/Map/_id'

function App() {
  return (
    <>
      <ContextProvider>
        <Loading/>
        <Notification/>
        <NavBar/>
        <Login/>
      </ContextProvider>
    </>
  )
}

export default App
