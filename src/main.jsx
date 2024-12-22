import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'
import 'leaflet/dist/leaflet.css'; // Import CSS Leaflet
import ContextProvider from './context/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline>
        {/* <ContextProvider></ContextProvider> */}
        <App />
      </CssBaseline>
    </CssVarsProvider>
  </React.StrictMode>
)
