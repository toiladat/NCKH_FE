import { Mail, Notifications } from '@mui/icons-material'
import { Avatar, Badge, Box, Icon, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '~/context/ContextProvider'
import UserMenu from '../UserMenu'

const UserIcons = () => {
  const { currentUser } = useValue()

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