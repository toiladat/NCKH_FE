import { experimental_extendTheme as extendTheme} from '@mui/material/styles'
import { alpha } from '@mui/material/styles';
import { cyan, deepOrange, orange, teal} from '@mui/material/colors'

const colorPrimary = alpha('#6CB1DA', 1);
const theme = extendTheme({
  trello:{
    appBarHeight:'48px',
    boardBarHeigh:'58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colorPrimary,
        },
        
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary:orange
      }
    }
  }
})
export default theme
