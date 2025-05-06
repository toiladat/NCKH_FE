import { extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px' // fixed typo
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  },
  components: {
    MuiModal: {
      defaultProps: {
        disableScrollLock: true // tắt cơ chế scroll-lock toàn cục
      }
    },
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true // đảm bảo popover cũng không lock scroll
      }
    }
  }
})

export default theme
