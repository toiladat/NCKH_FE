
import { experimental_extendTheme as createTheme, alpha } from '@mui/material/styles'
import { cyan, deepOrange, orange } from '@mui/material/colors'

// Định nghĩa các màu custom
const colorPrimary = alpha('#3152BF', 1)
const colorDarkBlue = '#1B2F5C'


const theme = createTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeigh: '58px'
  },
  customColors: {
    darkBlue: colorDarkBlue,
    Primary: colorPrimary
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colorPrimary,
          contrastText: '#fff'
        },
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
        contrastText: '#000'
      }
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif'
  }
})

export default theme

