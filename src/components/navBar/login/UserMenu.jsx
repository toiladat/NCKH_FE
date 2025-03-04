import { Logout, Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useValue } from '~/context/ContextProvider'
import UserCheckToken from '~/components/hooks/userCheckToken'
import Profile from './Profile'
import { useSelector } from 'react-redux'

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  UserCheckToken() // có token mới truy cập được vào cpn này
  const { dispatch } = useValue()
  const currentUser = useSelector(state => state.userReducer.currentUser)

  const handleCloseUserMenu= () => {
    setAnchorUserMenu(null)
  }


  return (
    <>
      <Menu anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {/* login bằng google thì k lưu csdl -> k check token be được */}
        { !currentUser?.google &&
          <MenuItem onClick={ () => {
            dispatch({
              type: 'UPDATE_PROFILE',
              payload:{
                open: true,
                file: null,
                photoURL: currentUser?.photoURL
              }
            })
          }}>
            <ListItemIcon>
              <Settings fontSize='small'/>
            </ListItemIcon>
            Profile
          </MenuItem>
        }
        <MenuItem onClick={ () => dispatch({ type:'UPDATE_USER', payload: null })}>
          <ListItemIcon >
            <Logout fontSize='small'/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile/>
    </>
  )
}

export default UserMenu