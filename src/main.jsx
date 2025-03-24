import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'
import 'leaflet/dist/leaflet.css' // Import CSS Leaflet
import { GoogleOAuthProvider } from '@react-oauth/google'
import { createStore } from 'redux'
import allReducers from './redux/reducers/index.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(allReducers)
ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
        <Provider store={store}> {/*redux */}
          <BrowserRouter> {/*react router dom */}
            <App />
          </BrowserRouter>
        </Provider>
      </GoogleOAuthProvider>
    </CssBaseline>
  </CssVarsProvider>
)
