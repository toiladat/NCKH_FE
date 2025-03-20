import { Logout, Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import UserCheckToken from '~/components/hooks/userCheckToken'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, updateUser } from '~/redux/actions/user'

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  UserCheckToken() // có token mới truy cập được vào cpn này
  const dispatch = useDispatch()
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
            dispatch(updateProfile({
              open: true,
              file: null,
              photoURL: currentUser?.photoURL
            }))
          }}>
            <ListItemIcon>
              <Settings fontSize='small'/>
            </ListItemIcon>
            Profile
          </MenuItem>
        }
        <MenuItem onClick={ () => dispatch(updateUser(null))}>
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