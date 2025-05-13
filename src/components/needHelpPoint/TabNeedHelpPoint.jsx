// file: HelpPointsTabs.jsx

import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography, Fade } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import NeedHelpPoints from './NeedHelpPoints'

function TabPanel({ children, value, index }) {
  return (
    <Fade in={value === index} timeout={400}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && (
          <Box sx={{ px: 2, py: 3 }}>
            {children}
          </Box>
        )}
      </div>
    </Fade>
  )
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  }
}

export default function HelpPointsTabs() {
  const [value, setValue] = useState(0)
  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const darkBlue = theme.customColors?.darkBlue || '#003366'

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', mt: 10 }}>
      {/* Tiêu đề */}
      <Typography
        sx={{
          fontSize: { xs: '30px', md: '45px' },
          fontWeight: 700,
          color: darkBlue,
          textAlign: 'center',
          mb: 5,
          mt: 4
        }}
      >
        Danh sách các điểm cứu trợ
      </Typography>

      {/* Tabs - Không dùng Paper */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          aria-label="help point tabs"
        >
          {['Tất cả', 'Điểm mới nhất', 'Điểm nổi bật'].map((label, index) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              sx={{
                fontWeight: 600,
                fontSize: '17px',
                textTransform: 'none',
                mx: { xs: 0.5, md: 2 },
                borderRadius: 2,
                transition: '0.3s ease',
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                  color: theme.palette.primary.main
                }
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Nội dung của từng tab */}
      <TabPanel value={value} index={0}>
        <NeedHelpPoints />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NeedHelpPoints filterType="newest" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NeedHelpPoints filterType="highlight" />
      </TabPanel>
    </Box>
  )
}
