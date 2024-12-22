import NavBar from './components/NavBar'
import ContextProvider, { useValue } from './context/ContextProvider'
import Board from './pages/Map/_id'

function App() {
  return (
    <>
      <ContextProvider>
        <NavBar/>
      </ContextProvider>
    </>
  )
}

export default App
