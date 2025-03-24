import { Mail, Notifications } from '@mui/icons-material'
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import UserMenu from './UserMenu'
import UserCheckToken from '~/components/hooks/userCheckToken'

const UserIcons = () => {
  UserCheckToken() // có token mới truy cập được vào cpn này
  const { currentUser } = useSelector(state => state.userReducer)

  const [anchorUserMenu, setAnchorUserMenu] =useState(null)
  return (
    <Box>
      <IconButton size='lagre' color='inherit'>
        <Badge color='error' badgeContent={ 5 }>
          <Mail/>
        </Badge>
      </IconButton>
      <IconButton size='lagre' color='inherit'>
        <Badge color='error' badgeContent={ 20 }>
          <Notifications/>
        </Badge>
      </IconButton>
      <Tooltip title='open user setting'>
        <IconButton onClick={ (e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {... { anchorUserMenu, setAnchorUserMenu }}/>
    </Box>
  )
}

export default UserIcons