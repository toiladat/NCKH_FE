import { Group, MapsHomeWork } from '@mui/icons-material'
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DashBoardMain } from '~/actions/admin'
import PiePoints from './PiePoints'
import LineChartPoints from './LineChartPoints'


const Main = () => {
  const dispatch = useDispatch()
  const { admin, admins, users, rescueHubPoints, needHelpPoints } = useSelector(state => state.adminReducer)

  useEffect( () => {
    DashBoardMain(admin, dispatch)
  },[])
  return (
    <Box
      sx={{
        display: { xs:'flex', md:'grid' },
        gridTemplateColumns:'repeat(3,1fr)',
        gridAutoRows:'minmax(100px, auto)',
        gap:3,
        textAlign:'center',
        flexDirection:'column'
      }}
    >
      {/* total users */}
      <Paper elevation={3} sx={{ p:3 }}>
        <Typography variant='h4'> Total users</Typography>
        <Box
          sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <Group sx={{ height:100, width:100, opacity:0.3, mr:1 }}/>
          <Typography variant='h4'>{users.length}</Typography>
        </Box>
      </Paper>

      {/* total need help point */}
      <Paper elevation={3} sx={{ p:3 }}>
        <Typography variant='h4'> Total need help points</Typography>
        <Box
          sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <MapsHomeWork sx={{ height:100, width:100, opacity:0.3, mr:1 }}/>
          <Typography variant='h4'>{needHelpPoints.length}</Typography>
        </Box>
      </Paper>

      {/* total rescue hub point */}
      <Paper elevation={3} sx={{ p:3 }}>
        <Typography variant='h4'> Total rescue hub points</Typography>
        <Box
          sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <MapsHomeWork sx={{ height:100, width:100, opacity:0.3, mr:1 }}/>
          <Typography variant='h4'>{rescueHubPoints.length}</Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p:2, gridColumn:3, gridRow:'1/5' }}>

        <Box>
          <Typography>Recently Added Admin</Typography>
          <List>
            {admins.slice(0, 4).map((admin, i) => (
              <Box key={admin._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={admin?.name} src={admin?.photoURL}/>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={`${admin?.name || 'Unknown'} - ${admin?.role ?? 'Admin'}\nTime Created: ${admin?.createdAt ? moment(admin.createdAt).format('YYYY-MM-DD H:mm:ss') : 'N/A'}`}
                    secondaryTypographyProps={{ style: { whiteSpace: 'pre-line' } }}
                  />
                </ListItem>
                {i!==3 && <Divider variant='inset'/>}
              </Box>
            ))}
          </List>
        </Box>

        <Divider sx={{ mt: 3, mb:3, opacity:0.7 }}/>

        <Box>
          <Typography>Tình nguyện viên || Quân đội ...</Typography>
          <List>
            {admins.slice(0, 4).map((admin, i) => (
              <Box key={admin._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={admin?.name} src={admin?.photoURL}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={admin?.name}
                    secondary={`Time Created: ${moment(admin?.createdAt).format('YYYY-MM-DD H:mm:ss')}`}
                  />
                </ListItem>
                {i!==3 && <Divider variant='inset'/>}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ gridColumn:'1/3' }}>
        <PiePoints statistic={[
          {
            name:'NeedHelpPoints',
            value: needHelpPoints.length
          },
          {
            name:'RescueHubPoints',
            value: rescueHubPoints.length
          }
        ]}/>
      </Paper>

      <Paper elevation={ 3 } sx={{ gridColumn:'1/3' }}>
        <LineChartPoints/>
      </Paper>
    </Box>
  )
}

export default Main