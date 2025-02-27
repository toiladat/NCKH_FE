import styled from '@emotion/styled'
import { ChevronLeft } from '@mui/icons-material'
import { Box, Drawer, IconButton, Typography } from '@mui/material'
import PriceSlider from './PriceSlider'
import { useValue } from '~/context/ContextProvider'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { containerRef } = useValue()
  return (
    <Drawer
      variant='persistent'
      hideBackdrop={true}
      open ={isOpen}
    >
      <Box sx={{ width: 280 }}>
        <DrawerHeader >
          <Typography> Apply Search of Filter</Typography>
          <IconButton onClick={ () => setIsOpen(false)}>
            <ChevronLeft fontSize='large'/>
          </IconButton>
        </DrawerHeader>
        <Box sx={{ width:240, p: 3 }}>
          <Box ref={containerRef}></Box>
          <PriceSlider/>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar